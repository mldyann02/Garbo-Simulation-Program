import { useState, useEffect, useMemo } from 'react';
import { calculatePublicValue, calculateSharedKey } from '../utils/diffieHellman';
import { transformToAESKey } from '../utils/keyTransform';
import { chunkAndPadMessage, encryptBlock, decryptBlock } from '../utils/aesProcessing';

export default function UserPanel({ 
  title, 
  colorClass, 
  remotePublicValue, 
  incomingCipherBlocks, 
  onPublicValueGenerated, 
  onCiphertextGenerated 
}) {
  // Local State
  const [privateKey, setPrivateKey] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  // Derived Cryptographic Values (Calculates automatically when inputs change)
  const publicValue = useMemo(() => {
    if (!privateKey) return '';
    try {
      return calculatePublicValue(privateKey);
    } catch {
      return ''; // Handle invalid inputs gracefully
    }
  }, [privateKey]);

  const sharedKey = useMemo(() => {
    if (!remotePublicValue || !privateKey) return '';
    try {
      return calculateSharedKey(remotePublicValue, privateKey);
    } catch {
      return '';
    }
  }, [remotePublicValue, privateKey]);

  const aesKey = useMemo(() => {
    if (!sharedKey) return '';
    return transformToAESKey(sharedKey);
  }, [sharedKey]);

  // Bubble up the public value to the App/Network whenever it changes
  useEffect(() => {
    if (onPublicValueGenerated) {
      onPublicValueGenerated(publicValue);
    }
  }, [publicValue, onPublicValueGenerated]);

  // Handlers
  const handleEncryptAndSend = () => {
    if (!messageInput || !aesKey) {
      alert("Please ensure you have a message and an established AES key.");
      return;
    }

    const chunks = chunkAndPadMessage(messageInput);
    const cipherBlocks = chunks.map(chunk => encryptBlock(chunk, aesKey));
    
    if (onCiphertextGenerated) {
      onCiphertextGenerated(cipherBlocks);
    }
  };

  const handleReceiveAndDecrypt = () => {
    if (!incomingCipherBlocks || incomingCipherBlocks.length === 0 || !aesKey) {
      alert("No encrypted message received or missing AES key.");
      return;
    }

    try {
      const decryptedBlocks = incomingCipherBlocks.map(block => decryptBlock(block, aesKey));
      setDecryptedMessage(decryptedBlocks.join(''));
    } catch (error) {
      setDecryptedMessage("Decryption failed. Keys may not match.");
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${colorClass}`}>
      <h2 className={`text-xl font-bold mb-4 ${colorClass.replace('border-', 'text-')}`}>
        {title} Environment
      </h2>
      
      <div className="space-y-4">
        {/* Key Generation Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Private Key (Decimal)</label>
          <input 
            type="number" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="e.g., 57"
          />
        </div>

        {/* Cryptographic Displays */}
        <div className="bg-gray-50 p-3 rounded border text-sm space-y-1 font-mono">
          <p><strong className="text-gray-700 font-sans">Public Value:</strong> {publicValue || 'Pending...'}</p>
          <p><strong className="text-gray-700 font-sans">Shared Key:</strong> {sharedKey || 'Pending...'}</p>
          <p className="break-all"><strong className="text-gray-700 font-sans">AES Key:</strong> {aesKey || 'Pending...'}</p>
        </div>

        {/* Messaging Section */}
        <hr className="my-4 border-gray-200" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Message to Send</label>
          <textarea 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-20"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type original message here..."
          />
        </div>

        <button 
          onClick={handleEncryptAndSend}
          className={`w-full text-white py-2 rounded transition ${
            title.includes('A') ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Encrypt & Send
        </button>

        {/* Decryption Section */}
        <hr className="my-4 border-gray-200" />

        <button 
          onClick={handleReceiveAndDecrypt}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Receive & Decrypt
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700">Decrypted Message</label>
          <div className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 h-20 overflow-y-auto">
            {decryptedMessage}
          </div>
        </div>
      </div>
    </div>
  );
}