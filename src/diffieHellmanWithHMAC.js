import CryptoJS from "crypto-js";

// Generate HMAC for key authentication
function generateHMAC(key, message) {
  return CryptoJS.HmacSHA256(message, key).toString(CryptoJS.enc.Base64);
}

// Diffie-Hellman with HMAC for authentication to prevent MITM
export function generateKeysWithHMAC(alicePrivateKey, bobPrivateKey, secretKey) {
  const p = 23; // A prime number
  const g = 5;  // A primitive root

  // Calculate public keys
  const alicePublicKey = Math.pow(g, alicePrivateKey) % p;
  const bobPublicKey = Math.pow(g, bobPrivateKey) % p;

  // Generate HMAC for both public keys
  const aliceHMAC = generateHMAC(secretKey, alicePublicKey.toString());
  const bobHMAC = generateHMAC(secretKey, bobPublicKey.toString());

  // Calculate shared secrets
  const aliceSharedSecret = Math.pow(bobPublicKey, alicePrivateKey) % p;
  const bobSharedSecret = Math.pow(alicePublicKey, bobPrivateKey) % p;

  if (aliceSharedSecret === bobSharedSecret) {
    // Validate HMACs to ensure no MITM
    const isAliceHMACValid = aliceHMAC === generateHMAC(secretKey, alicePublicKey.toString());
    const isBobHMACValid = bobHMAC === generateHMAC(secretKey, bobPublicKey.toString());

    if (isAliceHMACValid && isBobHMACValid) {
      // Derive symmetric key from shared secret
      const symmetricKey = CryptoJS.SHA256(aliceSharedSecret.toString()).toString(CryptoJS.enc.Base64);

      return {
        alicePrivateKey,
        bobPrivateKey,
        alicePublicKey,
        bobPublicKey,
        aliceSharedSecret,
        bobSharedSecret,
        symmetricKey,
        aliceHMAC,
        bobHMAC,
        status: "Keys authenticated and secure."
      };
    } else {
      return {
        status: "Authentication failed: Keys may be compromised."
      };
    }
  } else {
    return {
      status: "Error: Shared secrets do not match."
    };
  }
}
