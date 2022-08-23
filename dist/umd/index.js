(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@peculiar/webcrypto'), require('atob')) :
  typeof define === 'function' && define.amd ? define(['exports', '@peculiar/webcrypto', 'atob'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsVerifyRSAPSSSHA256 = {}, global.webcrypto, global.atob));
}(this, (function (exports, webcrypto, atob) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var atob__default = /*#__PURE__*/_interopDefaultLegacy(atob);

  const crypto = new webcrypto.Crypto();

  const string2ArrayBuffer = (str)=> {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf
  };

  const base64ToArrayBuffer = (b64)=> {
    var byteString = atob__default['default'](b64);
    var byteArray = new Uint8Array(byteString.length);
    for(var i=0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray
  };

  const verify = async ({ signature, publicKey, data, saltLength = 64 })=>{

    const publicKeyContent = publicKey.replace(/^.*?-----BEGIN PUBLIC KEY-----\n/, '').replace(/-----END PUBLIC KEY-----(\n)*$/, '');
    const binaryString = atob__default['default'](publicKeyContent);
    const binaryStringArrayBuffer = string2ArrayBuffer(binaryString);
    const cryptoKey = await crypto.subtle.importKey("spki", binaryStringArrayBuffer, { name: "RSA-PSS", hash: "SHA-256" }, true, ["verify"]);

    return await crypto.subtle.verify({ name: "RSA-PSS", saltLength }, cryptoKey, base64ToArrayBuffer(signature), string2ArrayBuffer(data))
  };

  exports.verify = verify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
