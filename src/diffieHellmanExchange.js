export function generateKeys(alicePrivateKey, bobPrivateKey) {
  const p = 11; // Prime number
  const g = 2;  // Generator

  // Calculate public keys
  const alicePublicKey = Math.pow(g, alicePrivateKey) % p;
  const bobPublicKey = Math.pow(g, bobPrivateKey) % p;

  // Calculate shared secrets
  const aliceSharedSecret = Math.pow(bobPublicKey, alicePrivateKey) % p;
  const bobSharedSecret = Math.pow(alicePublicKey, bobPrivateKey) % p;

  // Ensure both shared secrets match
  if (aliceSharedSecret !== bobSharedSecret) {
    return null; // Error handling for mismatch
  }

  return {
    alicePrivateKey,
    bobPrivateKey,
    alicePublicKey,
    bobPublicKey,
    aliceSharedSecret, 
    bobSharedSecret,
  };
}
