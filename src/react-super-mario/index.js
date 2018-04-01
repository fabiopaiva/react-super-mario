// @flow
import React from 'react';
import Background from './components/Background';
import Mario from './components/Player';
import allowedKeys from './util/allowedKeys';
import variables from './util/variables';
import './ReactSuperMario.css';

type Props = {}

type State = {
  activeKeys: typeof allowedKeys,
  width?: number,
  position: number,
  direction: 'ltr' | 'rtl',
  isMoving: boolean,
}

export default class ReactSuperMario extends React.Component<Props, State> {
  state = {
    activeKeys: allowedKeys,
    position: 0,
    direction: 'ltr',
    isMoving: false,
    width: 0,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    this._checkPlayerStatusTimeout = setInterval(this.checkPlayerStatus, 150)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
    clearInterval(this._checkPlayerStatusTimeout)
  }

  _checkPlayerStatusTimeout: IntervalID

  checkPlayerStatus = () => {
    const { activeKeys, direction, position, width } = this.state
    if (activeKeys.ArrowRight ? !activeKeys.ArrowLeft : activeKeys.ArrowLeft) {
      this.setState({ isMoving: true })
      if (direction === 'ltr' && activeKeys.ArrowLeft) {
        this.setState({ direction: 'rtl' })
      } else if (direction === 'rtl' && activeKeys.ArrowRight) {
        this.setState({ direction: 'ltr' })
      }
      if (activeKeys.ArrowRight && width && position < (width - variables.marioWidth - 20)) {
        this.setState({ position: position + 20 })
      } else if (activeKeys.ArrowLeft && position > 0) {
        this.setState({ position: position - 20 })
      }
    } else {
      this.setState({ isMoving: false })
    }
  }

  _gameContainerRef: ?HTMLDivElement
  getRef = (ref: ?HTMLDivElement) => {
    if (ref) {
      this._gameContainerRef = ref;
      this.setState({ width: ref.clientWidth })
    }
  }

  keyDown = (event: KeyboardEvent) => {
    const { activeKeys } = this.state
    if (activeKeys[event.key] === false ) {
      this.setState({ 
        activeKeys: {
          ...this.state.activeKeys,
          [event.key]: true,
        } 
      })
    }
  }

  keyUp = (event: KeyboardEvent) => {
    const { activeKeys } = this.state
    if (activeKeys[event.key] === true ) {
      this.setState({ 
        activeKeys: {
          ...this.state.activeKeys,
          [event.key]: false,
        } 
      })
    }
  }

  render() {
    const { activeKeys, position, direction, isMoving } = this.state
    return (
      <div className="ReactSuperMario" ref={this.getRef}>
        <Background activeKeys={activeKeys} />
        <Mario position={position} direction={direction} isMoving={isMoving} />
      </div>
    )
  }
}