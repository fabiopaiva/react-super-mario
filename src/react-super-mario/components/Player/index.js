// @flow
import React from 'react';
import type { allowedKeysType } from '../../util/allowedKeys';
import variables from '../../util/variables';
import './Player.css';

type Props = {
  activeKeys: allowedKeysType
}

type State = {
  position: number,
  direction: 'ltr' | 'rtl'
}

export default class Player extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      position: 0,
      direction: 'ltr'
    }

  }



  _checkPlayerStatusTimeout: IntervalID
  componentDidMount() {
    this._checkPlayerStatusTimeout = setInterval(this.checkPlayerStatus, 100)
  }

  componentWillUnmount() {
    clearInterval(this._checkPlayerStatusTimeout)
  }

  checkPlayerStatus = () => {
    const { activeKeys } = this.props
    const { direction, position } = this.state
    if (activeKeys.ArrowRight ? !activeKeys.ArrowLeft : activeKeys.ArrowLeft) {
      if (direction === 'ltr' && activeKeys.ArrowLeft) {
        this.setState({ direction: 'rtl' })
      } else if (direction === 'rtl' && activeKeys.ArrowRight) {
        this.setState({ direction: 'ltr' })
      }
      if (activeKeys.ArrowRight && position < 94) {
        this.setState({ position: position + 2 })
      } else if (activeKeys.ArrowLeft && position > 0) {
        this.setState({ position: position - 2 })
      }
    }
  }

  render() {
    const { direction, position } = this.state;
    return <div
      className="Player"
      style={{
        transform: direction === 'ltr' ? 'none' : 'scaleX(-1)',
        left: `${position}%`,
      }}
    />
  }
}