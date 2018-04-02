// @flow
import React from 'react';
import mario from '../../assets/players/mario.gif';
import marioMoving from '../../assets/players/mario-moving.gif';
import marioJumping from '../../assets/players/mario-jumping.gif';
import './Player.css';
import variables from '../../util/variables';

type Props = {
  positionX: number,
  positionY: number,
  direction: 'ltr' | 'rtl',
  isMoving: boolean,
  isJumping: boolean,
}

export default class Player extends React.PureComponent<Props> {
   render() {
    const { direction, positionX, positionY, isMoving, isJumping } = this.props;
    let image = mario;
    if (isMoving) {
      image = marioMoving;
    } else if (isJumping) {
      image = marioJumping;
    }
    return <div
      className="Player"
      style={{
        backgroundImage: `url(${image})`,
        transform: direction === 'ltr' ? 'none' : 'scaleX(-1)',
        left: `${positionX}px`,
        bottom: `${positionY + variables.groundHeight}px`,
      }}
    />
  }
}