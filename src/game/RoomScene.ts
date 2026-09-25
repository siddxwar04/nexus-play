import Phaser from 'phaser'
import {
  clearMarbleCapture,
  fulfill,
  getRoom,
  getRule,
  isWon,
  setMarbleCapture,
  setMarbleOrigin,
  subscribeRule,
  type RuleUpdate,
  type Snapshot,
} from './liveRule'
import { palette } from './palette'
import { gravityVector, type Rule } from './rule'
import type { RoomDef, Spot } from './rooms'
import { playCue } from './sound'

const MARBLE_RADIUS = 16
const MAX_SPEED = 640
const DOOR_WIDTH = 42
const DOOR_HEIGHT = 86
const DOOR_FRAME = 5
const MIN_BLOCK = 22
const KEY_SIZE = 16
const GUARD_SPEED = 150
const GUARD_REACH = 64
const GUARD_FOOT = 18
const MAX_BLOCKS = 2

type Inner = { left: number; right: number; top: number; bottom: number; width: number; height: number }

export class RoomScene extends Phaser.Scene {
  private room: RoomDef = getRoom()
  private lastRule: Rule = getRule()
  private frame?: Phaser.GameObjects.Graphics
  private backLife?: Phaser.GameObjects.Graphics
  private frontLife?: Phaser.GameObjects.Graphics
  private walls: Phaser.GameObjects.Rectangle[] = []
  private blocks: Phaser.GameObjects.Rectangle[] = []
  private blockCollider?: Phaser.Physics.Arcade.Collider
  private door?: Phaser.GameObjects.Container
  private doorSlab?: Phaser.GameObjects.Container
  private doorGlow?: Phaser.GameObjects.Rectangle
  private goal?: Phaser.GameObjects.Rectangle
  private key?: Phaser.GameObjects.Rectangle
  private guard?: Phaser.GameObjects.Rectangle
  private marble?: Phaser.GameObjects.Arc
  private marbleBody?: Phaser.Physics.Arcade.Body
  private doorX = 0
  private doorY = 0
  private doorOpen = false
  private keyTaken = false
  private elapsed = 0
  private guardHome = 0

  constructor() {
    super('room')
  }

  create() {
    this.frame = this.add.graphics()
    this.backLife = this.add.graphics().setDepth(2)
    this.frontLife = this.add.graphics().setDepth(4)
    this.addWalls()
    this.addDoor()
    this.addGoal()
    this.addKey()
    this.addGuard()
    const marble = this.addMarble()
    this.physics.add.collider(marble, this.walls)
    this.addBlocks(marble)
    this.enterRoom()

    const stopRule = subscribeRule((update) => {
      if (!this.physics?.world) return
      this.applyRule(update)
    })
    const capture = () => this.snapshot()
    setMarbleCapture(capture)
    this.scale.on('resize', this.onResize, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      stopRule()
      clearMarbleCapture(capture)
      this.scale.off('resize', this.onResize, this)
    })
  }

  update(_time: number, delta: number) {
    this.paintActors()
    this.keepMarbleInRoom()
    if (isWon()) {
      this.marbleBody?.setVelocity(0, 0)
      return
    }

    if (this.room.clock) this.elapsed += delta
    this.collectKey()
    this.moveGuard(delta)
    this.setDoorOpen(this.doorShouldOpen())
    this.checkWin()
  }

  // Room flow

  private enterRoom() {
    this.room = getRoom()
    this.lastRule = getRule()
    this.elapsed = 0
    this.keyTaken = false
    this.layoutAll()
    this.lastInner = this.inner()
    this.placeMarble()
    this.resetGuard()
    this.doorOpen = !this.room.key
    this.placeSlab(false)
    this.applySolidity()
    const origin = this.snapshot()
    if (origin) setMarbleOrigin(origin)
  }

  private applyRule(update: RuleUpdate) {
    const vector = gravityVector(update.rule.gravity)
    this.physics.world.gravity.set(vector.x, vector.y)

    if (update.resetRoom) {
      this.enterRoom()
      return
    }

    if (update.restore) {
      this.restore(update.restore)
    } else if (!update.won) {
      if (update.rule.timing !== this.lastRule.timing) this.elapsed = 0
      this.marbleBody?.setVelocity(0, 0)
    }

    this.lastRule = update.rule
    this.applySolidity()
  }

  private snapshot(): Snapshot | null {
    if (!this.marble || !this.marbleBody) return null

    return {
      x: this.marble.x,
      y: this.marble.y,
      vx: this.marbleBody.velocity.x,
      vy: this.marbleBody.velocity.y,
      keyTaken: this.keyTaken,
      guardX: this.guard?.x ?? 0,
      elapsed: this.elapsed,
    }
  }

  private restore(snapshot: Snapshot) {
    if (!this.marbleBody) return
    this.marbleBody.reset(snapshot.x, snapshot.y)
    this.marbleBody.setVelocity(snapshot.vx, snapshot.vy)
    this.keyTaken = snapshot.keyTaken
    this.elapsed = snapshot.elapsed
    this.guard?.setX(snapshot.guardX)
  }

  // Rules in the room

  private doorShouldOpen() {
    const rule = getRule()
    if (this.room.clock) return this.elapsed < rule.timing * 1000
    if (this.room.key) {
      return rule.door === 'key' ? this.keyTaken : (this.marbleBody?.blocked.down ?? false)
    }
    return true
  }

  private collectKey() {
    if (!this.room.key || this.keyTaken || !this.key || !this.marble) return
    if (this.physics.overlap(this.marble, this.key)) {
      this.keyTaken = true
      playCue('key')
    }
  }

  private guardBlocksDoor() {
    if (!this.room.guard || !this.guard) return false
    return Math.hypot(this.guard.x - this.doorX, this.guard.y - this.doorY) < GUARD_REACH
  }

  private moveGuard(delta: number) {
    if (!this.room.guard || !this.guard) return

    const inner = this.inner()
    const marbleX = this.marble?.x ?? this.guard.x
    const wanted = getRule().guard === 'door' ? this.guardHome : marbleX
    const targetX = Phaser.Math.Clamp(wanted, inner.left + 14, inner.right - 14)
    const dx = targetX - this.guard.x
    const step = (GUARD_SPEED * delta) / 1000
    if (Math.abs(dx) <= step) {
      this.guard.setX(targetX)
      return
    }
    this.guard.setX(this.guard.x + Math.sign(dx) * step)
  }

  private checkWin() {
    if (!this.doorOpen || !this.marble || !this.goal || this.guardBlocksDoor()) return
    if (this.physics.overlap(this.marble, this.goal)) fulfill()
  }

  private applySolidity() {
    if (!this.blockCollider) return
    this.blockCollider.active = this.room.blocks.length > 0 && getRule().solidity === 'solid'
  }

  private keepMarbleInRoom() {
    if (!this.marble || !this.marbleBody) return
    const inner = this.inner()
    const radius = MARBLE_RADIUS
    const x = Phaser.Math.Clamp(this.marble.x, inner.left + radius, inner.right - radius)
    const y = Phaser.Math.Clamp(this.marble.y, inner.top + radius, inner.bottom - radius)
    if (x === this.marble.x && y === this.marble.y) return
    const vx = x === this.marble.x ? this.marbleBody.velocity.x : 0
    const vy = y === this.marble.y ? this.marbleBody.velocity.y : 0
    this.marbleBody.reset(x, y)
    this.marbleBody.setVelocity(vx, vy)
  }

  // Geometry

  private inset() {
    return Math.min(28, Math.max(10, Math.round(this.scale.width * 0.03)))
  }

  private wallThickness() {
    return this.scale.width < 640 ? 16 : 26
  }

  private inner(): Inner {
    const pad = this.inset()
    const wall = this.wallThickness()
    const left = pad + wall
    const right = this.scale.width - pad - wall
    const top = pad + wall
    const bottom = this.scale.height - pad - wall
    return { left, right, top, bottom, width: right - left, height: bottom - top }
  }

  private blockTop(index: number) {
    const block = this.blocks[index]
    return block ? block.y - block.displayHeight / 2 : this.inner().bottom
  }

  private point(spot: Spot, radius: number) {
    const inner = this.inner()
    const x = Phaser.Math.Clamp(inner.left + spot.x * inner.width, inner.left + radius, inner.right - radius)
    let y = inner.top + spot.y * inner.height
    if (spot.onFloor) y = inner.bottom - radius - 1
    if (spot.onBlock !== undefined) y = this.blockTop(spot.onBlock) - radius - 2
    return { x, y: Phaser.Math.Clamp(y, inner.top + radius, inner.bottom - radius) }
  }

  private layoutAll() {
    this.drawFrame()
    this.layoutWalls()
    this.layoutBlocks()
    this.layoutDoor()
    this.layoutKey()
    this.layoutGuard()
  }

  private lastInner: Inner | null = null

  private onResize = () => {
    const before = this.lastInner
    this.layoutAll()
    const after = this.inner()
    if (before && this.marble && this.marbleBody && before.width > 0 && before.height > 0) {
      const fx = (this.marble.x - before.left) / before.width
      const fy = (this.marble.y - before.top) / before.height
      const vx = this.marbleBody.velocity.x
      const vy = this.marbleBody.velocity.y
      this.marbleBody.reset(after.left + fx * after.width, after.top + fy * after.height)
      this.marbleBody.setVelocity(vx, vy)
      if (this.guard) {
        const gx = (this.guard.x - before.left) / before.width
        this.guard.setX(after.left + gx * after.width)
      }
    }
    this.lastInner = after
  }

  private placeMarble() {
    if (!this.marbleBody) return
    const spot = this.point(this.room.spawn, MARBLE_RADIUS)
    this.marbleBody.reset(spot.x, spot.y)
    this.marbleBody.setVelocity(0, 0)
  }

  // Walls

  private addWalls() {
    for (let index = 0; index < 4; index += 1) {
      const wall = this.add.rectangle(0, 0, 10, 10, palette.wall)
      wall.setAlpha(0)
      this.physics.add.existing(wall, true)
      this.walls.push(wall)
    }
  }

  private layoutWalls() {
    const pad = this.inset()
    const thick = this.wallThickness()
    const left = pad
    const top = pad
    const right = this.scale.width - pad
    const bottom = this.scale.height - pad
    const width = Math.max(thick, right - left)
    const height = Math.max(thick, bottom - top)
    const places = [
      { x: left + width / 2, y: bottom - thick / 2, w: width, h: thick },
      { x: left + width / 2, y: top + thick / 2, w: width, h: thick },
      { x: left + thick / 2, y: top + height / 2, w: thick, h: height },
      { x: right - thick / 2, y: top + height / 2, w: thick, h: height },
    ]

    this.walls.forEach((wall, index) => {
      const place = places[index]
      wall.setPosition(place.x, place.y)
      wall.setDisplaySize(place.w, place.h)
      this.syncStatic(wall, place.w, place.h)
    })
  }

  private syncStatic(shape: Phaser.GameObjects.Rectangle, width: number, height: number, enabled = true) {
    const body = shape.body
    if (body instanceof Phaser.Physics.Arcade.StaticBody) {
      body.enable = enabled
      body.setSize(width, height, true)
      body.updateFromGameObject()
    }
  }

  // Blue blocks

  private addBlocks(marble: Phaser.GameObjects.Arc) {
    for (let index = 0; index < MAX_BLOCKS; index += 1) {
      const block = this.add.rectangle(0, 0, MIN_BLOCK, MIN_BLOCK, palette.block)
      block.setDepth(1)
      block.setAlpha(0)
      this.physics.add.existing(block, true)
      this.blocks.push(block)
    }
    this.blockCollider = this.physics.add.collider(marble, this.blocks)
  }

  private layoutBlocks() {
    const inner = this.inner()
    this.blocks.forEach((block, index) => {
      const def = this.room.blocks[index]
      if (!def) {
        block.setVisible(false)
        this.syncStatic(block, MIN_BLOCK, MIN_BLOCK, false)
        return
      }
      const width = Math.max(MIN_BLOCK, def.w * inner.width)
      const height = Math.max(MIN_BLOCK, def.h * inner.height)
      block.setVisible(true)
      block.setPosition(inner.left + (def.x + def.w / 2) * inner.width, inner.top + (def.y + def.h / 2) * inner.height)
      block.setDisplaySize(width, height)
      this.syncStatic(block, width, height, true)
    })
  }

  // Door

  private addDoor() {
    const frame = this.add.graphics()
    const w = DOOR_WIDTH
    const h = DOOR_HEIGHT
    const f = DOOR_FRAME
    frame.fillStyle(0x8d7349, 1)
    frame.fillRect(-w / 2 - f, -h / 2 - f, w + f * 2, f)
    frame.fillRect(-w / 2 - f, -h / 2, f, h + f)
    frame.fillRect(w / 2, -h / 2, f, h + f)
    frame.fillRect(-w / 2, h / 2, w, f)
    frame.fillStyle(0x101218, 1)
    frame.fillRect(-w / 2, -h / 2, w, h)
    this.doorGlow = this.add.rectangle(0, 0, w - 6, h - 10, palette.key, 0.2)

    const panel = this.add.rectangle(0, 0, w - 2, h - 2, palette.door)
    const detail = this.add.graphics()
    const inset = 8
    const gap = 6
    const panelWidth = w - inset * 2
    const panelHeight = (h - inset * 2 - gap) / 2
    detail.fillStyle(0xa6844e, 1)
    detail.fillRect(-panelWidth / 2, -h / 2 + inset, panelWidth, panelHeight)
    detail.fillRect(-panelWidth / 2, -h / 2 + inset + panelHeight + gap, panelWidth, panelHeight)
    const knob = this.add.circle(-w / 2 + 10, 2, 3.5, palette.key)
    this.doorSlab = this.add.container(0, 0, [panel, detail, knob])

    this.door = this.add.container(0, 0, [frame, this.doorGlow, this.doorSlab])
    this.door.setDepth(1)
  }

  private addGoal() {
    this.goal = this.add.rectangle(0, 0, 40, 52, 0x000000, 0)
    this.physics.add.existing(this.goal, true)
  }

  private layoutDoor() {
    if (!this.door || !this.goal) return

    const inner = this.inner()
    const { wall, at } = this.room.door
    const halfW = DOOR_WIDTH / 2
    const halfH = DOOR_HEIGHT / 2
    const alongX = Phaser.Math.Clamp(inner.left + at * inner.width, inner.left + halfW, inner.right - halfW)
    const alongY = Phaser.Math.Clamp(inner.top + at * inner.height, inner.top + halfH, inner.bottom - halfH)

    if (wall === 'right') {
      this.doorX = inner.right - halfW
      this.doorY = alongY
    } else if (wall === 'left') {
      this.doorX = inner.left + halfW
      this.doorY = alongY
    } else if (wall === 'floor') {
      this.doorX = alongX
      this.doorY = inner.bottom - halfH
    } else {
      this.doorX = alongX
      this.doorY = inner.top + halfH
    }

    const span = Math.min(inner.width, inner.height)
    this.door.setScale(Math.min(1, span / 280))
    this.door.setPosition(this.doorX, this.doorY)
    this.goal.setPosition(this.doorX, this.doorY)
    this.syncStatic(this.goal, 40, 52)
  }

  private setDoorOpen(open: boolean) {
    if (open === this.doorOpen) return
    this.doorOpen = open
    playCue(open ? 'door' : 'close')
    this.placeSlab(true)
  }

  private placeSlab(animate: boolean) {
    const slab = this.doorSlab
    if (!slab) return
    const y = this.doorOpen ? -DOOR_HEIGHT * 0.82 : 0
    const alpha = this.doorOpen ? 0.08 : 1
    this.tweens.killTweensOf(slab)
    if (!animate) {
      slab.setY(y)
      slab.setAlpha(alpha)
      return
    }
    this.tweens.add({ targets: slab, y, alpha, duration: 240, ease: 'Quad.easeOut' })
  }

  // Key

  private addKey() {
    this.key = this.add.rectangle(0, 0, KEY_SIZE, KEY_SIZE, palette.key)
    this.key.setDepth(2)
    this.key.setAlpha(0)
    this.physics.add.existing(this.key, true)
  }

  private layoutKey() {
    if (!this.key) return
    const spot = this.room.key
    if (!spot) {
      this.syncStatic(this.key, KEY_SIZE, KEY_SIZE, false)
      return
    }
    const point = this.point(spot, KEY_SIZE / 2)
    this.key.setPosition(point.x, point.y)
    this.syncStatic(this.key, KEY_SIZE, KEY_SIZE, true)
  }

  // Guard

  private addGuard() {
    this.guard = this.add.rectangle(0, 0, 24, 42, palette.guard)
    this.guard.setAlpha(0)
  }

  private layoutGuard() {
    if (!this.guard) return
    const inner = this.inner()
    this.guardHome = Phaser.Math.Clamp(this.doorX - 44, inner.left + 14, inner.right - 14)
    this.guard.setY(inner.bottom - GUARD_FOOT)
  }

  private resetGuard() {
    this.guard?.setX(this.guardHome)
  }

  // Marble

  private addMarble() {
    const marble = this.add.circle(0, 0, MARBLE_RADIUS, palette.marble)
    marble.setDepth(3)
    this.physics.add.existing(marble)

    const body = marble.body
    if (body instanceof Phaser.Physics.Arcade.Body) {
      body.setCircle(MARBLE_RADIUS)
      body.setAllowGravity(true)
      body.setBounce(0)
      body.setCollideWorldBounds(false)
      body.setMaxVelocity(MAX_SPEED, MAX_SPEED)
      body.setVelocity(0, 0)
      this.marble = marble
      this.marbleBody = body
    }

    return marble
  }

  // Painting

  private paintActors() {
    const back = this.backLife
    const front = this.frontLife
    if (!back || !front) return

    back.clear()
    front.clear()
    this.paintBlocks(back)
    this.paintKey(back)
    this.paintMarble(back, front)
    this.paintGuard(front)
    this.paintClock(front)
    this.paintDoorGlow()
  }

  private paintBlocks(g: Phaser.GameObjects.Graphics) {
    if (this.room.blocks.length === 0) return
    const alpha = getRule().solidity === 'ghost' ? 0.28 : 1
    this.blocks.forEach((block) => {
      if (!block.visible) return
      const width = block.displayWidth
      const height = block.displayHeight
      const left = block.x - width / 2
      const top = block.y - height / 2
      g.fillStyle(palette.block, alpha)
      g.fillRect(left, top, width, height)
      g.fillStyle(0xd7e6f8, alpha * 0.7)
      g.fillRect(left, top, width, Math.min(3, height))
    })
  }

  private paintKey(g: Phaser.GameObjects.Graphics) {
    if (!this.room.key || this.keyTaken || !this.key) return
    const x = this.key.x
    const y = this.key.y
    g.fillStyle(palette.key, 1)
    g.fillCircle(x - 6, y, 7)
    g.fillStyle(palette.floor, 1)
    g.fillCircle(x - 6, y, 3)
    g.fillStyle(palette.key, 1)
    g.fillRect(x - 1, y - 1.6, 16, 3.2)
    g.fillRect(x + 9, y + 1.4, 2.4, 5)
    g.fillRect(x + 12.4, y + 1.4, 2.4, 3.5)
  }

  private paintGuard(g: Phaser.GameObjects.Graphics) {
    if (!this.room.guard || !this.guard) return
    const x = this.guard.x
    const y = this.guard.y
    g.fillStyle(0x000000, 0.28)
    g.fillEllipse(x, y + 18, 30, 8)
    g.fillStyle(palette.guard, 1)
    g.fillCircle(x, y - 12, 12)
    g.fillRect(x - 12, y - 6, 24, 24)
    g.fillStyle(0x2a1214, 1)
    g.fillRect(x - 8, y - 14, 16, 5)
    g.fillStyle(palette.key, 1)
    g.fillCircle(x, y - 11, 2)
  }

  private paintMarble(back: Phaser.GameObjects.Graphics, front: Phaser.GameObjects.Graphics) {
    if (!this.marble) return
    const x = this.marble.x
    const y = this.marble.y
    const radius = MARBLE_RADIUS
    back.fillStyle(0x000000, 0.32)
    back.fillEllipse(x, y + radius * 0.75, radius * 1.55, radius * 0.42)
    front.fillStyle(0xfff6ea, 0.92)
    front.fillCircle(x - radius * 0.32, y - radius * 0.34, radius * 0.26)
    front.lineStyle(1.5, 0xc9bfae, 0.55)
    front.strokeCircle(x, y, radius)
  }

  private paintClock(g: Phaser.GameObjects.Graphics) {
    if (!this.room.clock) return
    const remaining = Phaser.Math.Clamp(1 - this.elapsed / (getRule().timing * 1000), 0, 1)
    const width = 56
    const y = this.doorY + DOOR_HEIGHT / 2 + 10
    g.fillStyle(palette.line, 0.6)
    g.fillRect(this.doorX - width / 2, y, width, 3)
    g.fillStyle(palette.key, 1)
    g.fillRect(this.doorX - width / 2, y, width * remaining, 3)
  }

  private paintDoorGlow() {
    if (!this.doorGlow) return
    const pulse = 0.14 + Math.sin(this.time.now / 380) * 0.05
    this.doorGlow.setAlpha(this.doorOpen ? 0.62 : pulse)
  }

  private drawFrame() {
    if (!this.frame) return

    const pad = this.inset()
    const thick = this.wallThickness()
    const width = Math.max(0, this.scale.width - pad * 2)
    const height = Math.max(0, this.scale.height - pad * 2)
    const innerWidth = Math.max(0, width - thick * 2)
    const innerHeight = Math.max(0, height - thick * 2)

    this.frame.clear()
    this.frame.fillStyle(palette.room, 1)
    this.frame.fillRect(pad, pad, width, height)
    this.frame.fillStyle(palette.floor, 1)
    this.frame.fillRect(pad + thick, pad + thick, innerWidth, innerHeight)
    this.frame.fillStyle(palette.wall, 1)
    this.frame.fillRect(pad, pad, width, thick)
    this.frame.fillRect(pad, pad + height - thick, width, thick)
    this.frame.fillRect(pad, pad, thick, height)
    this.frame.fillRect(pad + width - thick, pad, thick, height)
    this.frame.lineStyle(1, palette.lip, 0.85)
    this.frame.strokeRect(pad + thick, pad + thick, innerWidth, innerHeight)
    this.frame.lineStyle(1, palette.line, 1)
    this.frame.strokeRect(pad, pad, width, height)
  }
}
