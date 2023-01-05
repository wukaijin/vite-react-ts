import React from 'react'
import Player from '.'

/*
 * @Author: Carlos
 * @Date: 2023-01-05 00:50:47
 * @LastEditTime: 2023-01-06 00:04:54
 * @FilePath: /vite-react-swc/src/components/enhance/player/MusicPlayer.ts
 * @Description:
 */
class MusicPlayer {
  constructor(private _el: HTMLAudioElement, private _node: Player) {
    this._el = _el
    this._node = _node
    // this.initState()
    this.initEvents()
  }
  // initState() {}
  initEvents() {
    this._el.addEventListener('canplay', () => {
      console.log('canplay')
      this._node.updateDuration && this._node.updateDuration(this._el.duration)
    })
    this._el.addEventListener('ended', () => {
      console.log('ended')
    })
    this._el.addEventListener('timeupdate', () => {
      this._node.updateCurrentLycIndex && this._node.updateCurrentLycIndex(this._el.currentTime)
    })
  }
  play() {
    return this._el.play()
  }
  pause() {
    this._el.pause()
  }
}

export default MusicPlayer
