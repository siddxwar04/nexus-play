import Phaser from 'phaser'
import { palette } from './palette'

const ROOM_INSET = 28
const MARBLE_RADIUS = 16

export class RoomScene extends Phaser.Scene {
  private frame?: Phaser.GameObjects.Graphics

  constructor() {
    super('room')
  }

  create() {
    this.frame = this.add.graphics()
    this.drawFrame()
    this.addMarble()
    this.scale.on('resize', this.drawFrame, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.drawFrame, this)
    })
  }

  private addMarble() {
    const marble = this.add.circle(
      this.scale.width / 2,
      ROOM_INSET + MARBLE_RADIUS + 48,
      MARBLE_RADIUS,
      palette.marble,
    )
    this.physics.add.existing(marble)

    const body = marble.body
    if (!(body instanceof Phaser.Physics.Arcade.Body)) return

    body.setCircle(MARBLE_RADIUS)
    body.setAllowGravity(true)
    body.setCollideWorldBounds(false)
    body.setVelocity(0, 0)
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
