// RSA.js
function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  function modInverse(a, m) {
    let m0 = m;
    let y = 0, x = 1;
  
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
  
    if (x < 0) x += m0;
    return x;
  }
  
  function generateKeys(bits = 8) {
    // Step 1: Generate two large prime numbers p and q
    let p = generatePrime(bits);
    let q = generatePrime(bits);
  
    // Step 2: Compute n = p * q
    let n = p * q;
  
    // Step 3: Compute Euler's Totient function phi(n) = (p-1) * (q-1)
    let phi = (p - 1) * (q - 1);
  
    // Step 4: Choose an integer e (public key exponent) such that 1 < e < phi(n) and gcd(e, phi) = 1
    let e = 3;
    while (gcd(e, phi) !== 1) {
      e += 2;
    }
  
    // Step 5: Calculate d (private key exponent) such that d * e ≡ 1 (mod phi)
    let d = modInverse(e, phi);
  
    return { publicKey: { e, n }, privateKey: { d, n } };
  }
  
  function generatePrime(bits) {
    // Simple prime number generation (could be improved for larger keys)
    let prime = Math.floor(Math.random() * (2 ** bits - 1)) + 1;
    while (!isPrime(prime)) {
      prime += 1;
    }
    return prime;
  }
  
  function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  function encrypt(message, publicKey) {
    const { e, n } = publicKey;
    const messageCode = message.charCodeAt(0); // Only supports 1 char for simplicity
    return Math.pow(messageCode, e) % n; // Encrypt message
  }
  
  function decrypt(cipherText, privateKey) {
    const { d, n } = privateKey;
    const decryptedCode = Math.pow(cipherText, d) % n;
    return String.fromCharCode(decryptedCode); // Decrypted message
  }
  
  export { generateKeys, encrypt, decrypt };
  