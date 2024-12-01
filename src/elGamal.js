export const p = 1000000007; // A large prime number
export const g = 3;   // Primitive root
export { 
    encryptNumber as encryptElGamal, 
    decryptNumber as decryptElGamal, 
    stringToNumberChunks as stringToNumber,
    numberChunksToString as numberToString 
  };

// Convert string to an array of large numbers
export function stringToNumberChunks(str) {
  const chunks = [];
  for (let i = 0; i < str.length; i += 3) {
    // Take 3 characters at a time
    const chunk = str.slice(i, i + 3);
    let chunkNum = 0;
    
    // Convert 3-character chunk to a number
    for (let j = 0; j < chunk.length; j++) {
      chunkNum = (chunkNum * 256) + chunk.charCodeAt(j);
    }
    
    chunks.push(chunkNum);
  }
  
  return chunks;
}

/// Convert number chunks back to string
export function numberChunksToString(chunks) {
    // Check if chunks is not an array, convert to array if it's a single number
    if (!Array.isArray(chunks)) {
      chunks = [chunks];
    }
  
    let result = '';
    
    for (const chunk of chunks) {
      const chunkBytes = [];
      let remaining = chunk;
      
      // Recover original characters
      while (remaining > 0) {
        chunkBytes.unshift(remaining % 256);
        remaining = Math.floor(remaining / 256);
      }
      
      // Pad with zeros if needed to ensure 3-char chunks
      while (chunkBytes.length < 3) {
        chunkBytes.unshift(0);
      }
      
      // Convert bytes to characters
      result += chunkBytes.map(code => String.fromCharCode(code)).join('');
    }
    
    return result;
  }

// Modular exponentiation
export function modExp(base, exp, mod) {
  let result = 1;
  base = base % mod;
  
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  
  return result;
}

// Modular multiplicative inverse
function modInverse(a, m) {
  a = a % m;
  
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  
  return 1;
}

// ElGamal encryption for a single number
export function encryptNumber(num, publicKey, p, g) {
  // Use a random ephemeral key between 1 and p-2
  const y = Math.floor(Math.random() * (p - 2)) + 1;
  
  // Calculate c1 and c2
  const c1 = modExp(g, y, p);
  const c2 = (num * modExp(publicKey, y, p)) % p;
  
  return { c1, c2 };
}

// ElGamal decryption for a single number
export function decryptNumber(c1, c2, privateKey, p) {
  // Calculate shared secret
  const sharedSecret = modExp(c1, privateKey, p);
  
  // Find modular multiplicative inverse
  const sharedSecretInverse = modInverse(sharedSecret, p);
  
  // Decrypt
  const decryptedMessage = (c2 * sharedSecretInverse) % p;
  
  return decryptedMessage;
}

// Encrypt entire string
export function encryptString(str, publicKey, p, g) {
  // Convert string to chunks of numbers
  const numberChunks = stringToNumberChunks(str);
  
  // Encrypt each chunk
  return numberChunks.map(chunk => 
    encryptNumber(chunk, publicKey, p, g)
  );
}

// Decrypt entire string
export function decryptString(encryptedChunks, privateKey, p) {
  // Decrypt each chunk
  const decryptedChunks = encryptedChunks.map(chunk => 
    decryptNumber(chunk.c1, chunk.c2, privateKey, p)
  );
  
  // Convert chunks back to string
  return numberChunksToString(decryptedChunks);
}