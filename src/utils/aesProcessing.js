import CryptoJS from 'crypto-js';

/**
 * Chunks a message into 16-character (128-bit) blocks and pads with '@'
 * @param {string} message - The original plaintext
 * @returns {string[]} Array of 16-character sub-messages
 */
export const chunkAndPadMessage = (message) => {
  const chunks = [];
  // Split into 16-character blocks
  for (let i = 0; i < message.length; i += 16) {
    let chunk = message.slice(i, i + 16);
    
    // If sub-message is less than 16 chars, pad with '@'
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
  
  // FIX: Use a static "Zero IV" (16 bytes of zeros) instead of reusing the key
  const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); 

  const encrypted = CryptoJS.AES.encrypt(block, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding // We handle our own '@' padding
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
  
  // FIX: Use the same static "Zero IV" for decryption
  const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

  const decrypted = CryptoJS.AES.decrypt(cipherBlock, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};