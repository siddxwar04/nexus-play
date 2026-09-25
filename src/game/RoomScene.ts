import Phaser from 'phaser'
import { subscribeRule } from './liveRule'
import { palette } from './palette'
import { gravityVector, type Direction } from './rule'

const ROOM_INSET = 28
const WALL_THICKNESS = 28
const MARBLE_RADIUS = 16
const MAX_FALL_SPEED = 640
const DOOR_WIDTH = 18
const DOOR_HEIGHT = 84

export class RoomScene extends Phaser.Scene {
  private frame?: Phaser.GameObjects.Graphics
  private walls: Phaser.GameObjects.Rectangle[] = []
  private door?: Phaser.GameObjects.Rectangle
  private marbleBody?: Phaser.Physics.Arcade.Body

  constructor() {
    super('room')
  }

  create() {
    this.frame = this.add.graphics()
    this.drawFrame()
    this.addWalls()
    this.addDoor()
    const marble = this.addMarble()
    this.physics.add.collider(marble, this.walls)
    const stopRule = subscribeRule((rule) => {
      this.applyGravity(rule.gravity)
    })
    this.scale.on('resize', this.onResize, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      stopRule()
      this.scale.off('resize', this.onResize, this)
    })
  }

  private applyGravity(direction: Direction) {
    const vector = gravityVector(direction)
    this.physics.world.gravity.set(vector.x, vector.y)
    this.marbleBody?.setVelocity(0, 0)
  }

  private onResize = () => {
    this.drawFrame()
    this.layoutWalls()
    this.layoutDoor()
  }

  private addWalls() {
    for (let index = 0; index < 4; index += 1) {
      const wall = this.add.rectangle(0, 0, WALL_THICKNESS, WALL_THICKNESS, palette.wall)
      this.physics.add.existing(wall, true)
      this.walls.push(wall)
    }
    this.layoutWalls()
  }

  private layoutWalls() {
    const left = ROOM_INSET
    const top = ROOM_INSET
    const right = this.scale.width - ROOM_INSET
    const bottom = this.scale.height - ROOM_INSET
    const innerWidth = Math.max(WALL_THICKNESS, right - left)
    const innerHeight = Math.max(WALL_THICKNESS, bottom - top)
    const places = [
      { x: left + innerWidth / 2, y: bottom - WALL_THICKNESS / 2, w: innerWidth, h: WALL_THICKNESS },
      { x: left + innerWidth / 2, y: top + WALL_THICKNESS / 2, w: innerWidth, h: WALL_THICKNESS },
      { x: left + WALL_THICKNESS / 2, y: top + innerHeight / 2, w: WALL_THICKNESS, h: innerHeight },
      { x: right - WALL_THICKNESS / 2, y: top + innerHeight / 2, w: WALL_THICKNESS, h: innerHeight },
    ]

    this.walls.forEach((wall, index) => {
      const place = places[index]
      wall.setPosition(place.x, place.y)
      wall.setDisplaySize(place.w, place.h)
      const body = wall.body
      if (body instanceof Phaser.Physics.Arcade.StaticBody) {
        body.setSize(place.w, place.h, true)
        body.updateFromGameObject()
      }
    })
  }

  private addDoor() {
    this.door = this.add.rectangle(0, 0, DOOR_WIDTH, DOOR_HEIGHT, palette.door)
    this.door.setDepth(1)
    this.layoutDoor()
  }

  private layoutDoor() {
    if (!this.door) return

    const rightInner = this.scale.width - ROOM_INSET - WALL_THICKNESS
    const floorTop = this.scale.height - ROOM_INSET - WALL_THICKNESS
    this.door.setPosition(rightInner - DOOR_WIDTH / 2, floorTop - DOOR_HEIGHT / 2)
  }

  private addMarble() {
    const marble = this.add.circle(
      this.scale.width / 2,
      ROOM_INSET + WALL_THICKNESS + MARBLE_RADIUS + 48,
      MARBLE_RADIUS,
      palette.marble,
    )
    marble.setDepth(1)
    this.physics.add.existing(marble)

    const body = marble.body
    if (body instanceof Phaser.Physics.Arcade.Body) {
      body.setCircle(MARBLE_RADIUS)
      body.setAllowGravity(true)
      body.setBounce(0)
      body.setCollideWorldBounds(false)
      body.setMaxVelocity(MAX_FALL_SPEED, MAX_FALL_SPEED)
      body.setVelocity(0, 0)
      this.marbleBody = body
    }

    return marble
  }

  private drawFrame = () => {
    if (!this.frame) return

    const width = Math.max(0, this.scale.width - ROOM_INSET * 2)
    const height = Math.max(0, this.scale.height - ROOM_INSET * 2)

    this.frame.clear()
    this.frame.fillStyle(palette.room, 1)
    this.frame.fillRect(ROOM_INSET, ROOM_INSET, width, height)
    this.frame.lineStyle(2, palette.line, 1)
    this.frame.strokeRect(ROOM_INSET, ROOM_INSET, width, height)
  }
}
