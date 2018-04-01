// @flow

type keys = {
  ArrowLeft: boolean,
  ArrowRight: boolean,
  ArrowUp: boolean,
  ArrowDown: boolean,
  a: boolean,
  s: boolean,
  z: boolean,
  x: boolean,
}

const allowedKeys: keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  a: false,
  s: false,
  z: false,
  x: false,
}

export default allowedKeys

export type allowedKeysType = typeof allowedKeys