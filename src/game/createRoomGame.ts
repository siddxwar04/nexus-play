import Phaser from 'phaser'
import { palette } from './palette'
import { RoomScene } from './RoomScene'

export function createRoomGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: palette.page,
    banner: false,
    scale: {
      mode: Phaser.Scale.ScaleModes.RESIZE,
      width: Math.max(parent.clientWidth, 320),
      height: Math.max(parent.clientHeight, 240),
    },
    scene: [RoomScene],
  })
}
