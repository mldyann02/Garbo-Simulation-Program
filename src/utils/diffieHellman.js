
// Constants assigned by the simulation requirements [cite: 5, 222]
export const DH_PRIME = 199n; // p
export const DH_GENERATOR = 127n; // g

/**
 * Calculates (g ^ privateKey) % p
 * @param {number|string} privateKey - The decimal equivalent of ASCII value [cite: 200]
 * @returns {string} The resulting public value
 */
export const calculatePublicValue = (privateKey) => {
  const priv = BigInt(privateKey);
  // BigInt exponentiation: (g ** priv) % p [cite: 265]
  return (DH_GENERATOR ** priv % DH_PRIME).toString();
};

/**
 * Calculates (publicValue ^ privateKey) % p
 * @param {string} remotePublicValue 
 * @param {number|string} localPrivateKey 
 * @returns {string} The established shared secret key [cite: 226]
 */
export const calculateSharedKey = (remotePublicValue, localPrivateKey) => {
  const pub = BigInt(remotePublicValue);
  const priv = BigInt(localPrivateKey);
  return (pub ** priv % DH_PRIME).toString();
};