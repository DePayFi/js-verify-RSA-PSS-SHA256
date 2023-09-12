import internalVerify from './verify'

const crypto = new (require("@peculiar/webcrypto").Crypto)()
const atob = require('atob')

const verify = ({ signature, publicKey, data, saltLength = 64 })=>{
  return internalVerify({ signature, publicKey, data, crypto, atob })
}

export {
  verify
}
