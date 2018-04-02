// @flow
import * as React from 'react'
import variables from '../../util/variables'
import './Touchable.css'

type Props = {
  children: React.Node,
  positionX: number,
  scenarioPosition: number,
  positionY: number,
  playerPositionX: number,
  playerPositionY: number,
  onTouch: () => void,
  active: boolean,
}

export default class Touchable extends React.PureComponent<Props, {}> {
  state = {}
  static getDerivedStateFromProps(nextProps:Props) {
    const { onTouch, active, scenarioPosition } = nextProps
    if (!active) {
      const diffX = nextProps.playerPositionX - nextProps.positionX + ((scenarioPosition * (variables.bushesWidth / 600)))
      const diffY = nextProps.playerPositionY - nextProps.positionY
      if (Math.abs(diffX) <= 30 && Math.abs(diffY) <= 30) {
        onTouch()
      }
    }
    return null
  }
  
  render() {
    const { children, scenarioPosition, positionX, positionY } = this.props
    return (
      <div 
        className="Touchable"
        style={{ 
          left: `${positionX - ((scenarioPosition * (variables.bushesWidth / 700)))}px`, 
          bottom: `${positionY}px` }
        }
      >
        {children}
      </div>
    )
  }
}