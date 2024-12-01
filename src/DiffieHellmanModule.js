import React, { useState } from "react";
import { generateKeys } from "./diffieHellmanExchange";
import { performMITMAttack } from "./diffieHellmanWithMITM";
import { generateKeysWithHMAC } from "./diffieHellmanWithHMAC";
import "./App.css"; // Import the new CSS file for styling
import { Link } from "react-router-dom";


function App() {
  const [alicePrivateKey, setAlicePrivateKey] = useState("");
  const [bobPrivateKey, setBobPrivateKey] = useState("");
  const [secretKey, setSecretKey] = useState(""); // Shared secret key for HMAC
  const [keys, setKeys] = useState(null);
  const [mitmResult, setMitmResult] = useState(null);
  const [attackMode, setAttackMode] = useState(null);
  const [authKey, setAuthKey] = useState("");


  const handleGenerateKeysWithoutAuth = () => {
    if (alicePrivateKey && bobPrivateKey) {
      const generatedKeys = generateKeys(Number(alicePrivateKey), Number(bobPrivateKey));
      if (generatedKeys) {
        setKeys(generatedKeys);
        setMitmResult(null); // Clear MITM result
      } else {
        alert("Error: Shared secrets do not match.");
      }
    } else {
      alert("Please enter both private keys.");
    }
  };

  const handlePerformMITMAttack = () => {
    
    if (keys) {
      const attackResult = performMITMAttack(keys.alicePublicKey, keys.bobPublicKey);
      setMitmResult(attackResult);
    } else {
      alert("Please generate keys first.");
    }
  };

  const handleAuthenticatedExchange = () => {
    if (alicePrivateKey && bobPrivateKey) {
      const authResult = generateKeysWithHMAC(
        Number(alicePrivateKey),
        Number(bobPrivateKey),
        authKey
      );
      setKeys(authResult);
    } else {
      alert("Please enter both private keys and an authentication key.");
    }
  };

  return (
    <div className="app-container">
      <h1>Diffie-Hellman Key Exchange</h1>

      {/* Input fields for Alice's and Bob's Private Keys */}
      <div className="key-input-container">
        <div className="input-group">
          <label>Alice's Private Key:</label>
          <input
            type="number"
            value={alicePrivateKey}
            onChange={(e) => setAlicePrivateKey(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Bob's Private Key:</label>
          <input
            type="number"
            value={bobPrivateKey}
            onChange={(e) => setBobPrivateKey(e.target.value)}
          />
        </div>
      </div>

      {/* For Module 3 (HMAC Authentication), input for the secret key */}
      {attackMode === "authentication" && (
        <div className="input-group">
          <label>Shared Secret Key (for HMAC):</label>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>
      )}

      {/* Buttons for selecting modules */}
      <div className="button-container">
        <button className="module-button" onClick={handleGenerateKeysWithoutAuth}>
          Generate Keys Without Authentication (Module 1)
        </button>
        <button
          className="module-button"
          onClick={handlePerformMITMAttack}
          disabled={!keys}
        >
          Perform MITM Attack Without Authentication (Module 2)
        </button>
        <button className="module-button" onClick={handleAuthenticatedExchange}>
          Generate Keys With Authentication (Module 3)
        </button>
      </div>

      {/* Display generated keys (Module 1) */}
      {keys && (
        <div className="key-display-container">
          <h2>Generated Keys</h2>
          <div className="key-display">
            <p><strong>Alice's Private Key:</strong> {keys.alicePrivateKey}</p>
            <p><strong>Bob's Private Key:</strong> {keys.bobPrivateKey}</p>
            <p><strong>Alice's Public Key:</strong> {keys.alicePublicKey}</p>
            <p><strong>Bob's Public Key:</strong> {keys.bobPublicKey}</p>
            <p><strong>Shared Secret bob:</strong> {keys.bobSharedSecret}</p>
            <p><strong>Shared Secret Alice:</strong> {keys.aliceSharedSecret}</p>
          </div>
        </div>
      )}

      {/* Display MITM attack results */}
      {mitmResult && (
        <div className="mitm-result-container">
          <h2>MITM Attack Results</h2>
          <p><strong>Alice's Private Key:</strong> {keys.alicePrivateKey}</p>
          <p><strong>Bob's Private Key:</strong> {keys.bobPrivateKey}</p>
          <p><strong>Alice's Public Key (Actual Secret to be Shared):</strong> {keys.alicePublicKey}</p>
          <p><strong>Bob's Public Key(Actual Secret to be Shared) :</strong> {keys.bobPublicKey}</p>
          <p><strong>Attacker's Private Key:</strong> {mitmResult.attackerPrivateKey}</p>
          <p><strong>Attacker's Shared secret with Alice & Bob:</strong> {mitmResult.attackerSecretWithAlice}</p>
          <p><strong>Attacker's Shared key with bob:</strong> {mitmResult.attackerwithbob}</p>
          <p><strong>Attacker's Shared key with alice:</strong> {mitmResult.attackerwithalice}</p>
        </div>
      )}

        {/* Display authenticated keys and status */}
        {keys && keys.status && (
          <div className="mitm-result-container">
            <h2>Authenticated Key Exchange Results</h2>
            <p><strong>Status:</strong> {keys.status}</p>
            {keys.status === "Keys authenticated and secure." && (
              <>
                <p><strong>Alice's Public Key:</strong>  {keys.alicePublicKey}</p>
                <p> <strong>Bob's Public Key:</strong>  {keys.bobPublicKey}</p>
                <p><strong>Shared Secret (Alice):</strong> {keys.aliceSharedSecret}</p>
                <p><strong>Shared Secret (Bob):</strong> {keys.bobSharedSecret}</p>
                <p><strong>Symmetric Key: </strong>{keys.symmetricKey}</p>
              </>
            )}
          </div>
        )}

        <router>
            <Link to="/">
            <button className="home-button">Back to Home</button>
            </Link>
        </router>
    </div>
  );
}

export default App;
