import React, { useState } from "react";
import { generateKeys, encrypt, decrypt } from "./RSA";
import { Link } from "react-router-dom";
import "./rsa.css";

function RSAComponent() {
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState(null);
  const [decryptedText, setDecryptedText] = useState("");

  const handleGenerateKeys = () => {
    const { publicKey, privateKey } = generateKeys();
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  const handleEncrypt = () => {
    if (plainText && publicKey) {
      const encrypted = encrypt(plainText, publicKey);
      setCipherText(encrypted);
    }
  };

  const handleDecrypt = () => {
    if (cipherText && privateKey) {
      const decrypted = decrypt(cipherText, privateKey);
      setDecryptedText(decrypted);
    }
  };

  return (
    <div className="rsa-component">
      <h2>RSA Encryption and Decryption</h2>
      <div className="key-generation-section">
        <button className="generate-keys-btn" onClick={handleGenerateKeys}>
          Generate RSA Keys
        </button>
        {publicKey && privateKey && (
          <div className="keys-display">
            <div><strong>Public Key:</strong> {publicKey}</div>
            <div><strong>Private Key:</strong> {privateKey}</div>
          </div>
        )}
      </div>

      <div className="encryption-section">
        <div className="input-section">
          <label>Enter Plaintext:</label>
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder="Enter text to encrypt"
          />
          <button className="encrypt-btn" onClick={handleEncrypt}>
            Encrypt
          </button>
        </div>

        {cipherText && (
          <div className="result-section">
            <h3>Ciphertext:</h3>
            <p>{cipherText}</p>
          </div>
        )}

        <div className="decryption-section">
          <button className="decrypt-btn" onClick={handleDecrypt}>
            Decrypt
          </button>
          {decryptedText && (
            <div className="result-section">
              <h3>Decrypted Text:</h3>
              <p>{decryptedText}</p>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
}

export default RSAComponent;
