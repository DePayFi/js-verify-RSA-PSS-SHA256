(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DePayVerifySignature = {}));
}(this, (function (exports) { 'use strict';

  const string2ArrayBuffer = (str)=> {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf
  };

  const base64ToArrayBuffer = (b64, atob)=> {
    const safeB64 = b64.replace(/-/g, '+').replace(/_/g, '/');
    const byteString = atob(safeB64);
    let byteArray = new Uint8Array(byteString.length);
    for(let i=0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray
  };

  var internalVerify = async ({ signature, publicKey, data, saltLength = 64, crypto, atob })=>{

    let innerPublicKey = publicKey.replace(/^.*?-----BEGIN PUBLIC KEY-----\n/, '').replace(/-----END PUBLIC KEY-----(\n)*$/, '').replace(/(\n)*/g, '');
    while (innerPublicKey.length % 4) { // add proper padding
      innerPublicKey += '=';
    }
    const binaryString = atob(innerPublicKey);
    const binaryStringArrayBuffer = string2ArrayBuffer(binaryString);
    const cryptoKey = await crypto.subtle.importKey("spki", binaryStringArrayBuffer, { name: "RSA-PSS", hash: "SHA-256" }, true, ["verify"]);

    return await crypto.subtle.verify({ name: "RSA-PSS", saltLength }, cryptoKey, base64ToArrayBuffer(signature, atob), string2ArrayBuffer(data))
  };

  const crypto = window.crypto;
  const atob = window.atob;

  const verify = ({ signature, publicKey, data, saltLength = 64 })=>{
    return internalVerify({ signature, publicKey, data, saltLength, crypto, atob })
  };

  exports.verify = verify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
