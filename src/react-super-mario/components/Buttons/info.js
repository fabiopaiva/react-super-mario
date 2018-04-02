// @flow
import React from 'react'
import './Buttons.css'
import variables from '../../util/variables'

type Props = {
  positionX: number,
  scenarioPosition: number,
  positionY: number,
  playerPositionX: number,
  playerPositionY: number,
  onTouch: () => void,
  active: boolean,
}
type State = {}

export default class ButtonInfo extends React.PureComponent<Props, State> {
  componentDidUpdate(nextProps: Props) {
    const { onTouch, active } = nextProps
    if (!active) {
      const diffX = nextProps.playerPositionX - nextProps.positionX
      const diffY = nextProps.playerPositionY - nextProps.positionY
      if (Math.abs(diffX) <= 30 && Math.abs(diffY) <= 30) {
        onTouch()
      }
    }
  }

  render() {
    const { scenarioPosition, positionX, positionY } = this.props
    return (
      <div 
        className="Button ButtonInfo" 
        style={{ 
          left: `${positionX - ((scenarioPosition * (variables.bushesWidth / 700)))}px`, 
          bottom: `${positionY}px` }
        } 
      />
    )

  }
}