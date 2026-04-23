import CryptoJS from 'crypto-js';

/**
 * Chunks a message into 16-character (128-bit) blocks and pads with '@'
 * @param {string} message - The original plaintext
 * @returns {string[]} Array of 16-character sub-messages
 */
export const chunkAndPadMessage = (message) => {
  const chunks = [];
  // Split into 16-character blocks [cite: 17, 68, 89]
  for (let i = 0; i < message.length; i += 16) {
    let chunk = message.slice(i, i + 16);
    
    // If sub-message is less than 16 chars, pad with '@' [cite: 4, 19, 70, 90, 201]
    if (chunk.length < 16) {
      chunk = chunk.padEnd(16, '@');
    }
    chunks.push(chunk);
  }
  return chunks;
};

/**
 * Encrypts a single 16-character block using AES-128
 * @param {string} block - The 16-character sub-message
 * @param {string} transformedKey - The 16-character AES key
 * @returns {string} The encrypted ciphertext block
 */
export const encryptBlock = (block, transformedKey) => {
  // Convert key and block to UTF-8 for CryptoJS
  const key = CryptoJS.enc.Utf8.parse(transformedKey);
  const iv = CryptoJS.enc.Utf8.parse(transformedKey); // Simple IV for simulation

  const encrypted = CryptoJS.AES.encrypt(block, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding // We handle our own '@' padding [cite: 20]
  });

  return encrypted.toString();
};

/**
 * Decrypts a single block and removes '@' padding
 * @param {string} cipherBlock - The encrypted block
 * @param {string} transformedKey - The 16-character AES key
 * @returns {string} The decrypted plaintext block
 */
export const decryptBlock = (cipherBlock, transformedKey) => {
  const key = CryptoJS.enc.Utf8.parse(transformedKey);
  const iv = CryptoJS.enc.Utf8.parse(transformedKey);

  const decrypted = CryptoJS.AES.decrypt(cipherBlock, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};