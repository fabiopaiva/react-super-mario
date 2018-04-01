// @flow
import React from 'react';
import mario from '../../assets/players/mario.gif';
import marioMoving from '../../assets/players/mario-moving.gif';
import './Player.css';

type Props = {
  position: number,
  direction: 'ltr' | 'rtl',
  isMoving: boolean,
}

export default class Player extends React.PureComponent<Props> {
   render() {
    const { direction, position, isMoving } = this.props;
    return <div
      className="Player"
      style={{
        backgroundImage: `url(${isMoving ? marioMoving : mario})`,
        transform: direction === 'ltr' ? 'none' : 'scaleX(-1)',
        left: `${position}px`,
      }}
    />
  }
}