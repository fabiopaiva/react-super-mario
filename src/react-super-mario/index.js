// @flow
import React from 'react';
import Background from './components/Background';
import Mario from './components/Player';
import allowedKeys from './util/allowedKeys';
import './ReactSuperMario.css';

type Props = {}

type State = {
  activeKeys: typeof allowedKeys
}

export default class ReactSuperMario extends React.Component<Props, State> {
  state = {
    activeKeys: allowedKeys
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
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
    const { activeKeys } = this.state
    return (
      <div className="ReactSuperMario">
        <Background activeKeys={activeKeys} />
        <Mario activeKeys={activeKeys} />
      </div>
    )
  }
}