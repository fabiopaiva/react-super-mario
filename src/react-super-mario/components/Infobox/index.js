// @flow
import * as React from 'react'
import './Infobox.css'

type Props = {
  children: React.Node,
}

type State = {
  maxWidth: string,
  height: string,
  opacity: number,
}

export default class Infobox extends React.PureComponent<Props, State> {
  state = {
    maxWidth: '0px',
    height: '0px',
    opacity: 0,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        maxWidth: '500px',
        height: '300px',
        opacity: 1
      })
    }, 100)
  }

  render() {
    const { children } = this.props
    const { height, maxWidth, opacity } = this.state
    return (
      <div className="Infobox" style={{ maxWidth, height, opacity }}>
        {children}
      </div>
    )
  }
}