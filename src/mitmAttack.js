// mitmAttack.js
export function performMITMAttack(alicePublicKey, bobPublicKey) {
    const p = 23; // Prime number used in Diffie-Hellman
    const g = 5;  // Primitive root
  
    // Attacker generates their own private and public keys
    const attackerPrivateKey = Math.floor(Math.random() * 100);
    const attackerPublicKey = Math.pow(g, attackerPrivateKey) % p;
  
    // Attacker intercepts the public keys and sends their own public key to Alice and Bob
    const aliceInterceptedKey = attackerPublicKey;
    const bobInterceptedKey = attackerPublicKey;
  
    // Now the attacker computes the shared secret with Alice and Bob
    const aliceSharedSecret = Math.pow(bobInterceptedKey, attackerPrivateKey) % p;
    const bobSharedSecret = Math.pow(aliceInterceptedKey, attackerPrivateKey) % p;
  
    return {
      attackerPrivateKey,
      attackerPublicKey,
      aliceSharedSecret,
      bobSharedSecret,
    };
  }
  