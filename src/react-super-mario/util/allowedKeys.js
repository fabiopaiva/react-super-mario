// @flow

type keys = {
  ArrowLeft: boolean,
  ArrowRight: boolean,
  ArrowUp: boolean,
  ArrowDown: boolean,
}

const allowedKeys: keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
}

export default allowedKeys

export type allowedKeysType = typeof allowedKeys