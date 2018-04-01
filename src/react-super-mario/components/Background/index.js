// @flow
import React from 'react';
import type { allowedKeysType } from '../../util/allowedKeys';
import './Background.css';

type Props = {
  activeKeys: allowedKeysType
}

export default class Background extends React.PureComponent<Props> {
  render() {
    const { activeKeys } = this.props;
    return (
      <div className="Background" />
    )
  }
}