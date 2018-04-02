// @flow
import React from 'react'
import toastr from 'toastr'
import Background from './components/Background'
import Mario from './components/Player'
import ButtonInfo from './components/Buttons/info'
import InfoBox from './components/Infobox'
import allowedKeys from './util/allowedKeys'
import variables from './util/variables'
import introMusic from './assets/audio/mpi.wav'
import music from './assets/audio/mp.wav'
import jumpAudio from './assets/audio/smw_jump.wav'
import infoAudio from './assets/audio/smw_message_block.wav'
import './ReactSuperMario.css'

type Props = {}

type State = {
  width?: number,
  positionX: number,
  positionY: number,
  scenarioPosition: number,
  direction: 'ltr' | 'rtl',
  isMoving: boolean,
  isJumping: boolean,
  isFalling: boolean,
  displayInfo: boolean,
}

export default class ReactSuperMario extends React.Component<Props, State> {
  state = {
    width: 0,
    positionX: 0,
    positionY: 0,
    scenarioPosition: 0,
    direction: 'ltr',
    isMoving: false,
    isJumping: false,
    isFalling: false,
    displayInfo: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
    this._gameCoreRunTimeout = setInterval(this.gameCoreRun, 80);
    toastr.success('Move with arrow LEFT/RIGHT <br/>Run with A or S <br/>Jump with Z', 'Instructions', { timeOut: 5000 });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
    clearInterval(this._gameCoreRunTimeout);
  }

  _gameCoreRunTimeout: IntervalID;
  _activeKeys: typeof allowedKeys = allowedKeys;
  _gameContainerRef: ?HTMLDivElement;
  _audioRef: ?HTMLAudioElement;
  _audioSfxRef: ?HTMLAudioElement;

  restart() {
    clearInterval(this._gameCoreRunTimeout)
    this._gameCoreRunTimeout = setInterval(this.gameCoreRun, 80)
  }

  gameCoreRun = () => {
    const { direction, positionX, positionY, width, scenarioPosition, isJumping, isFalling } = this.state;
    const { _activeKeys } = this;
    const step = _activeKeys.a || _activeKeys.s ?  20 : 10;
    const jumpLimit = 120;

    // Movement
    if (_activeKeys.ArrowRight ? !_activeKeys.ArrowLeft : _activeKeys.ArrowLeft) {
      this.setState({ isMoving: true });
      if (direction === 'ltr' && _activeKeys.ArrowLeft) {
        this.setState({ direction: 'rtl' });
      } else if (direction === 'rtl' && _activeKeys.ArrowRight) {
        this.setState({ direction: 'ltr' });
      }
      if (_activeKeys.ArrowRight && width && positionX > (width * 40 / 100)) {
        this.setState({ scenarioPosition: scenarioPosition + step });
      } else if (_activeKeys.ArrowLeft && positionX <= step && scenarioPosition > 0) {
        this.setState({ scenarioPosition: scenarioPosition - step });
      } else if (_activeKeys.ArrowRight && width && positionX < (width - variables.marioWidth - step)) {
        this.setState({ positionX: positionX + step });
      } else if (_activeKeys.ArrowLeft && positionX > 0) {
        this.setState({ positionX: positionX - step });
      }
    } else {
      this.setState({ isMoving: false });
    }

    // Jump
    if (_activeKeys.z && !isFalling) {
      if (!isJumping) {
        this._audioSfxRef.src = jumpAudio;
        this._audioSfxRef.play();
      }
      this.setState({ isJumping: true });
      if (positionY < jumpLimit) {
        this.setState({ positionY: positionY + 30 });
      } else {
        this.setState({ isFalling: true });
      }
    } else {
      if (positionY > 0) {
        const nextPositionY = positionY - (_activeKeys.z ? 30 : 40)
        this.setState({ isFalling: true, positionY: nextPositionY >= 0 ? nextPositionY : 0 });
      } else {
        this.setState({ isJumping: false, isFalling: _activeKeys.z });
      }
    }
  }

  handleGameInfo = () => {
    clearInterval(this._gameCoreRunTimeout)
    if (this._audioSfxRef) {
      this._audioSfxRef.src = infoAudio
      this._audioSfxRef.play()
    }
    this.setState({ displayInfo: true })
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

  getSfxAudioRef = (ref: ?HTMLAudioElement) => {
    if (ref) {
      this._audioSfxRef = ref;
    }
  }

  keyDown = (event: KeyboardEvent) => {
    const { _activeKeys, state: { displayInfo } } = this
    if (_activeKeys[event.key] === false ) {
      _activeKeys[event.key] = true
      if (displayInfo) {
        this.setState({ displayInfo: false })
        this.restart()
      }
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
      positionX, 
      positionY,
      direction, 
      isMoving,
      isJumping,
      scenarioPosition,
      displayInfo,
    } = this.state
    return (
      <div className="ReactSuperMario" ref={this.getRef}>
        <Background position={scenarioPosition} />
        <Mario
          positionX={positionX}
          positionY={positionY} 
          direction={direction} 
          isMoving={isMoving} 
          isJumping={isJumping} 
        />
        <audio src={introMusic} ref={this.getAudioRef} />
        <audio ref={this.getSfxAudioRef} />
        <ButtonInfo 
          scenarioPosition={scenarioPosition} 
          positionX={200} 
          positionY={150}
          playerPositionX={positionX}
          playerPositionY={positionY}
          onTouch={this.handleGameInfo}
          active={displayInfo}
        />
        {displayInfo && (
          <InfoBox>
            <h2>React JS Super Mario</h2>
            <p>
              This project is a demonstration we can do amazing stuffs with 
              {' '}
              <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
            </p>
            <p>
              Check also the source code
              {' '}
              <a href="https://github.com/fabiopaiva/react-super-mario" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github fa-2x" />
              </a>
            </p>
            <br />
            <h2>Follow me:</h2>
            <p>
              <a href="https://github.com/fabiopaiva" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github fa-2x" />
              </a>
              {' '}
              <a href="https://twitter.com/fabaopaiva" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x" />
              </a>
              {' '}
              <a href="https://www.facebook.com/paiva.fabiofelipe" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x" />
              </a>
            </p>
          </InfoBox>
        )}
      </div>
    )
  }
}