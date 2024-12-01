import CryptoJS from "crypto-js";

export function performMITMAttack(alicePrivateKey, bobPrivateKey) {
  
  const p = 11; // Prime number
  const g = 2;  // Generator

  // Calculate Alice and Bob's public keys
  const alicePublicKey = Math.pow(g, alicePrivateKey) % p;
  const bobPublicKey = Math.pow(g, bobPrivateKey) % p;

  // Attacker generates their private and public keys
  const attackerPrivateKey = Math.floor(Math.random() * 100); // Random private key for attacker

  // Calculate shared secrets
  const attackerSecretWithAlice = Math.pow(g,attackerPrivateKey) % p;
  const attackerwithbob = Math.pow(bobPublicKey,attackerSecretWithAlice) % p;
  const attackerwithalice = Math.pow(alicePublicKey,attackerSecretWithAlice) % p;
  return {
    alicePrivateKey,
    bobPrivateKey,
    alicePublicKey,
    bobPublicKey,
    attackerPrivateKey,
    attackerSecretWithAlice,
    attackerwithbob,
    attackerwithalice,
  };
}
