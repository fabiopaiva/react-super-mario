// @flow
import React from 'react'

const aspect = 1.3333333333

type Props = {
    width: number
}

export default class ReactSuperMario extends React.PureComponent<Props> {
    render() {
        const { width } = this.props
        return (
            <svg width={width} height={width / aspect}>
                <rect width="100%" height="100%" fill="red"/>
            </svg>
        )
    }
}