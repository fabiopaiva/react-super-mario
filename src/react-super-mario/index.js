// @flow
import React from 'react';
import Background from './components/Background';
import Mario from './components/Player';
import allowedKeys from './util/allowedKeys';
import variables from './util/variables';
import introMusic from './assets/musics/mpi.wav';
import music from './assets/musics/mp.wav';
import './ReactSuperMario.css';

type Props = {}

type State = {
  width?: number,
  position: number,
  scenarioPosition: number,
  direction: 'ltr' | 'rtl',
  isMoving: boolean,
}

export default class ReactSuperMario extends React.Component<Props, State> {
  state = {
    position: 0,
    scenarioPosition: 0,
    direction: 'ltr',
    isMoving: false,
    width: 0,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    this._gameCoreRunTimeout = setInterval(this.gameCoreRun, 50)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
    clearInterval(this._gameCoreRunTimeout)
  }

  _gameCoreRunTimeout: IntervalID;
  _activeKeys: typeof allowedKeys = allowedKeys;
  _gameContainerRef: ?HTMLDivElement;
  _audioRef: ?HTMLAudioElement;

  gameCoreRun = () => {
    const { direction, position, width, scenarioPosition } = this.state;
    const { _activeKeys } = this;
    const step = _activeKeys.a || _activeKeys.s ?  20 : 10;
    if (_activeKeys.ArrowRight ? !_activeKeys.ArrowLeft : _activeKeys.ArrowLeft) {
      this.setState({ isMoving: true })
      if (direction === 'ltr' && _activeKeys.ArrowLeft) {
        this.setState({ direction: 'rtl' })
      } else if (direction === 'rtl' && _activeKeys.ArrowRight) {
        this.setState({ direction: 'ltr' })
      }
      if (_activeKeys.ArrowRight && width && position > (width * 40 / 100)) {
        this.setState({ scenarioPosition: scenarioPosition + step })
      } else if (_activeKeys.ArrowLeft && position <= step && scenarioPosition > 0) {
        this.setState({ scenarioPosition: scenarioPosition - step })
      } else if (_activeKeys.ArrowRight && width && position < (width - variables.marioWidth - step)) {
        this.setState({ position: position + step })
      } else if (_activeKeys.ArrowLeft && position > 0) {
        this.setState({ position: position - step })
      }
    } else {
      this.setState({ isMoving: false })
    }
  }

  getRef = (ref: ?HTMLDivElement) => {
    if (ref) {
      this._gameContainerRef = ref;
      this.setState({ width: ref.clientWidth })
    }
  }

  getAudioRef = (ref: ?HTMLAudioElement) => {
    if (ref) {
      this._audioRef = ref;
      ref.play();
      ref.onended = () => {
        ref.src = music;
        ref.loop = true;
        ref.play();
        ref.onended = () => {};
      }
    }
  }

  keyDown = (event: KeyboardEvent) => {
    const { _activeKeys } = this;
    if (_activeKeys[event.key] === false ) {
      _activeKeys[event.key] = true;
    }
  }

  keyUp = (event: KeyboardEvent) => {
    const { _activeKeys } = this;
    if (_activeKeys[event.key] === true ) {
      _activeKeys[event.key] = false;
    }
  }

  render() {
    const { 
      position, 
      direction, 
      isMoving,
      scenarioPosition,
    } = this.state
    return (
      <div className="ReactSuperMario" ref={this.getRef}>
        <Background position={scenarioPosition} />
        <Mario position={position} direction={direction} isMoving={isMoving} />
        <audio src={introMusic} ref={this.getAudioRef} />
      </div>
    )
  }
}