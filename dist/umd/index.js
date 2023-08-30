(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DePayVerifySignature = {}));
}(this, (function (exports) { 'use strict';

  let crypto;
  let atob;

  if (typeof window === 'undefined') { // running in Node.js
    crypto = new (require("@peculiar/webcrypto").Crypto)();
    atob = require('atob');
  } else {
    crypto = window.crypto;
    atob = window.atob;
  }

  const string2ArrayBuffer = (str)=> {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf
  };

  const base64ToArrayBuffer = (b64)=> {
    var byteString = atob(b64);
    var byteArray = new Uint8Array(byteString.length);
    for(var i=0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray
  };

  const verify = async ({ signature, publicKey, data, saltLength = 64 })=>{

    const publicKeyContent = publicKey.replace(/^.*?-----BEGIN PUBLIC KEY-----\n/, '').replace(/-----END PUBLIC KEY-----(\n)*$/, '').replace(/(\n)*$/, '');
    const binaryString = atob(publicKeyContent);
    const binaryStringArrayBuffer = string2ArrayBuffer(binaryString);
    const cryptoKey = await crypto.subtle.importKey("spki", binaryStringArrayBuffer, { name: "RSA-PSS", hash: "SHA-256" }, true, ["verify"]);

    return await crypto.subtle.verify({ name: "RSA-PSS", saltLength }, cryptoKey, base64ToArrayBuffer(signature), string2ArrayBuffer(data))
  };

  exports.verify = verify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
