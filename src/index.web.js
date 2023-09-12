import internalVerify from './verify'

const crypto = window.crypto
const atob = window.atob

const verify = ({ signature, publicKey, data, saltLength = 64 })=>{
  return internalVerify({ signature, publicKey, data, saltLength, crypto, atob })
}

export {
  verify
}
