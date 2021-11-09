const crypto = require('crypto');
const key = 'encryptionkeyencryptionkeyencryp';

const encrypt = ({ password, iv }) => {

  if (iv) {
    console.log(iv)
    
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), Buffer.from(iv, "hex"));

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return { iv: iv.toString('hex'), password: encryptedPassword.toString('hex') };
  } else {
    const iv = Buffer.from(crypto.randomBytes(16)).slice(0, 16);
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), iv);

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return { iv: iv.toString('hex'), password: encryptedPassword.toString('hex') };
  }
};

const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(key),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};

module.exports = { encrypt, decrypt }