import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    encryptNumber as encryptElGamal, 
    decryptNumber as decryptElGamal, 
    stringToNumberChunks as stringToNumber,
    numberChunksToString as numberToString, 
    modExp, 
    p, 
    g 
  } from "./elGamal";
import './ElGamalModule.css';

function ElGamalModule() {
  const [privateKey, setPrivateKey] = useState(""); 
  const [plainText, setPlainText] = useState(""); 
  const [ciphertext, setCiphertext] = useState(null); 
  const [decryptedMessage, setDecryptedMessage] = useState(""); 
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    setError("");
    if (!privateKey || !plainText) {
      setError("Please enter both private key and plaintext.");
      return;
    }

    try {
      const publicKey = modExp(g, Number(privateKey), p);
      const numPlainText = stringToNumber(plainText);
      const { c1, c2 } = encryptElGamal(numPlainText, publicKey, p, g);
      setCiphertext({ c1, c2 });
      setDecryptedMessage("");
    } catch (err) {
      setError("Encryption failed. Please check your inputs.");
      console.error(err);
    }
  };

  const handleDecrypt = () => {
    setError("");
    if (!privateKey || !ciphertext) {
      setError("Please encrypt a message first.");
      return;
    }

    try {
      const decryptedNumber = decryptElGamal(ciphertext.c1, ciphertext.c2, Number(privateKey), p);
      const decryptedText = numberToString(decryptedNumber);
      setDecryptedMessage(decryptedText);
    } catch (err) {
      setError("Decryption failed. Please check your private key.");
      console.error(err);
    }
  };

  const handleRandomKey = () => {
    const randomKey = Math.floor(Math.random() * 1000) + 1;
    setPrivateKey(randomKey.toString());
  };

  return (
    <div className="elgamal-container">
      <div className="elgamal-wrapper">
        <div className="elgamal-header">
          <h1>ElGamal Encryption</h1>
          <p>Secure asymmetric encryption demonstration</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="input-section">
          <div className="input-group">
            <label>Private Key</label>
            <div className="input-with-button">
              <input
                type="text"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter private key"
              />
              <button 
                className="generate-key-btn" 
                onClick={handleRandomKey}
                title="Generate Random Key"
              >
                🎲
              </button>
              <label>Enter Plaintext</label>
              <input
                type="text"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter message to encrypt"
              />
            </div>
          </div>

          <button 
            className="primary-btn" 
            onClick={handleEncrypt}
            disabled={!privateKey || !plainText}
          >
            Encrypt Message
          </button>
        </div>

        {ciphertext && (
          <div className="output-section">
            <h3>Ciphertext</h3>
            <div className="ciphertext-display">
              <div className="cipher-item">
                <label>c1:</label>
                <span>{ciphertext.c1}</span>
              </div>
              <div className="cipher-item">
                <label>c2:</label>
                <span>{ciphertext.c2}</span>
              </div>
            </div>

            <button 
              className="secondary-btn" 
              onClick={handleDecrypt}
            >
              Decrypt Message
            </button>
          </div>
        )}

        {decryptedMessage && (
          <div className="output-section">
            <h3>Decrypted Message</h3>
            <p className="decrypted-text">{decryptedMessage}</p>
          </div>
        )}

        <div className="navigation">
          <Link to="/" className="home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ElGamalModule;