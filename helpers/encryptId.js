const CryptoJS = require('crypto-js');

exports.encryptId = (str) => {
  console.log(typeof str);
  const ciphertext = CryptoJS.AES.encrypt(str, process.env.CRYPTO_SECRET);
  return encodeURIComponent(ciphertext.toString());
};
