// @flow
import React from 'react';
import variables from '../../util/variables';
import './Background.css';

type Props = {
  position: number
}

export default class Background extends React.PureComponent<Props> {
  render() {
    const { position } = this.props
    return (
      <div 
        className="Background" 
        style={{
          backgroundPosition: `
            left ${-((position * (variables.groundWidth / 80)))}px bottom 0px,
            left ${-((position * (variables.bushesWidth / 700)))}px bottom ${variables.groundHeight}px,
            left ${-((position * (variables.backWidth / 1000)))}px bottom 0px
          `
        }}
      />
    )
  }
}