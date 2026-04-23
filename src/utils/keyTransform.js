/**
 * Transforms the shared key into a 16-character string for AES-128 [cite: 227]
 * @param {string} sharedKey - The computed shared secret (e.g., "1", "58", or "109")
 * @returns {string} A 16-character transformed key [cite: 266]
 */
export const transformToAESKey = (sharedKey) => {
  const keyStr = sharedKey.toString();
  let finalKey = "";

  if (keyStr.length === 1) {
    // Rule: Alternate with 'C' [cite: 206, 228]
    // Example: "1" -> "1C1C1C1C1C1C1C1C"
    finalKey = (keyStr + "C").repeat(8);
  } 
  else if (keyStr.length === 2) {
    // Rule: Alternate with 'DD' [cite: 207, 229]
    // Example: "58" -> "58DD58DD58DD58DD"
    finalKey = (keyStr + "DD").repeat(4);
  } 
  else if (keyStr.length === 3) {
    // Rule: Use 'F' as a separator to reach 16 characters [cite: 209, 230]
    // Example: "109" -> "109F109F109F109F" + "1" (to fill to 16)
    // We use a loop to ensure it is exactly 16 chars
    const pattern = keyStr + "F";
    finalKey = pattern.repeat(4);
  }

  return finalKey.substring(0, 16);
};