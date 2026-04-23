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
  onCiphertextGenerated,
  isDarkMode
}) {
  const [privateKey, setPrivateKey] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const publicValue = useMemo(() => {
    if (!privateKey) return '';
    try {
      return calculatePublicValue(privateKey);
    } catch {
      return '';
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

  useEffect(() => {
    if (onPublicValueGenerated) {
      onPublicValueGenerated(publicValue);
    }
  }, [publicValue, onPublicValueGenerated]);

  const handleEncryptAndSend = () => {
    if (!messageInput || !aesKey) {
      alert("Please ensure you have a message and an established AES key.");
      return;
    }

    // FIX: ASCII Validation to prevent > 1 byte characters from breaking the 128-bit blocks
    if (!/^[\x00-\x7F]*$/.test(messageInput)) {
      alert("Simulation Error: Please use standard 8-bit ASCII characters only.");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      const chunks = chunkAndPadMessage(messageInput);
      const cipherBlocks = chunks.map(chunk => encryptBlock(chunk, aesKey));
      
      if (onCiphertextGenerated) {
        onCiphertextGenerated(cipherBlocks);
      }
      setMessageInput('');
      setIsSending(false);
    }, 300);
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

  const isKeyReady = publicValue && sharedKey && aesKey;
  const hasReceivedMessage = incomingCipherBlocks && incomingCipherBlocks.length > 0;
  const isSender = title.includes('A');
  const accentColor = isSender ? '#0ea5e9' : '#6366f1';
  const accentColorLight = isSender ? '#0284c7' : '#4f46e5';
  const accentColorDark = isSender ? '#38bdf8' : '#818cf8';

  return (
    <div style={{
      background: isDarkMode ? '#111827' : '#ffffff',
      border: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)'}`,
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isDarkMode 
        ? '0 10px 30px rgba(0, 0, 0, 0.3)'
        : '0 10px 30px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'}`,
        background: isDarkMode 
          ? `linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%)`
          : `linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(2, 132, 199, 0.03) 100%)`,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDarkMode 
            ? isSender ? 'rgba(14, 165, 233, 0.2)' : 'rgba(99, 102, 241, 0.2)'
            : isSender ? 'rgba(2, 132, 199, 0.2)' : 'rgba(79, 70, 229, 0.2)',
          fontSize: '1.25rem',
          fontWeight: '700',
          color: isDarkMode ? accentColorDark : accentColorLight,
        }}>
          {isSender ? 'A' : 'B'}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{
            margin: '0 0 0.25rem 0',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: isDarkMode ? accentColorDark : accentColorLight,
          }}>
            {title}
          </h2>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: isDarkMode ? '#94a3b8' : '#64748b',
          }}>
            {isSender ? 'Sender' : 'Receiver'}
          </p>
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          background: isKeyReady 
            ? isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'
            : isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)',
          color: isKeyReady 
            ? isDarkMode ? '#818cf8' : '#4f46e5'
            : isDarkMode ? '#94a3b8' : '#64748b',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isKeyReady 
              ? isDarkMode ? '#6366f1' : '#4f46e5'
              : isDarkMode ? '#64748b' : '#94a3b8',
            animation: isKeyReady ? 'pulse 2s infinite' : 'none',
          }}></span>
          {isKeyReady ? 'Ready' : 'Waiting'}
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: isDarkMode ? '#cbd5e1' : '#1f2937',
              marginBottom: '0.5rem',
            }}>
              Private Key (Decimal)
            </label>
            <input 
              type="number"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: isDarkMode ? '#0a0f1c' : '#f8fafc',
                border: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)'}`,
                borderRadius: '8px',
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                fontSize: '1rem',
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s ease',
              }}
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="e.g., 57"
              onFocus={(e) => e.target.style.borderColor = accentColor}
              onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)'}
            />
          </div>
        </div>

        <div style={{
          background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
          border: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'}`,
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: isDarkMode ? '#cbd5e1' : '#1f2937',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Cryptographic Values
          </h3>

          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              <p style={{
                fontSize: '0.85rem',
                color: isDarkMode ? '#94a3b8' : '#64748b',
                margin: '0 0 0.25rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Public Value
              </p>
              <div style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                border: `1px solid ${isSender ? 'rgba(14, 165, 233, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                borderRadius: '6px',
                padding: '0.75rem',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                wordBreak: 'break-all',
                minHeight: '2.25rem',
                display: 'flex',
                alignItems: 'center',
              }}>
                {publicValue || '—'}
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <p style={{
                fontSize: '0.85rem',
                color: isDarkMode ? '#94a3b8' : '#64748b',
                margin: '0 0 0.25rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Shared Key
              </p>
              <div style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                border: `1px solid ${remotePublicValue && sharedKey ? 'rgba(99, 102, 241, 0.3)' : 'rgba(71, 85, 105, 0.3)'}`,
                borderRadius: '6px',
                padding: '0.75rem',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                color: remotePublicValue && sharedKey 
                  ? isDarkMode ? '#cbd5e1' : '#1f2937'
                  : isDarkMode ? '#64748b' : '#94a3b8',
                wordBreak: 'break-all',
                minHeight: '2.25rem',
                display: 'flex',
                alignItems: 'center',
              }}>
                {sharedKey || '—'}
              </div>
            </div>

            <div>
              <p style={{
                fontSize: '0.85rem',
                color: isDarkMode ? '#94a3b8' : '#64748b',
                margin: '0 0 0.25rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                AES-128 Key
              </p>
              <div style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                border: `1px solid ${aesKey ? 'rgba(139, 92, 246, 0.3)' : 'rgba(71, 85, 105, 0.3)'}`,
                borderRadius: '6px',
                padding: '0.75rem',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                color: aesKey 
                  ? isDarkMode ? '#cbd5e1' : '#1f2937'
                  : isDarkMode ? '#64748b' : '#94a3b8',
                wordBreak: 'break-all',
                minHeight: '2.25rem',
                display: 'flex',
                alignItems: 'center',
              }}>
                {aesKey || '—'}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'}`,
          margin: '1.5rem 0',
        }}></div>

        {isSender ? (
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: isDarkMode ? '#cbd5e1' : '#1f2937',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Send Message
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <textarea 
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: isDarkMode ? '#0a0f1c' : '#f8fafc',
                  border: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)'}`,
                  borderRadius: '8px',
                  color: isDarkMode ? '#cbd5e1' : '#1f2937',
                  fontSize: '0.95rem',
                  fontFamily: 'system-ui, sans-serif',
                  resize: 'vertical',
                  minHeight: '5rem',
                  transition: 'all 0.2s ease',
                }}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type message to encrypt and send..."
                onFocus={(e) => e.target.style.borderColor = accentColor}
                onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.5)'}
              />
            </div>

            <button 
              onClick={handleEncryptAndSend}
              disabled={!isKeyReady || isSending}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: !isKeyReady 
                  ? isDarkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(2, 132, 199, 0.2)'
                  : isSender ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: !isKeyReady ? (isDarkMode ? '#64748b' : '#94a3b8') : 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: !isKeyReady ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (isKeyReady && !isSending) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 10px 20px ${isSender ? 'rgba(14, 165, 233, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {isSending ? 'Encrypting...' : 'Encrypt & Send'}
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: isDarkMode ? '#cbd5e1' : '#1f2937',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Receive Message
            </h3>

            <button 
              onClick={handleReceiveAndDecrypt}
              disabled={!isKeyReady || !hasReceivedMessage}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: !isKeyReady || !hasReceivedMessage
                  ? isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'
                  : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: !isKeyReady || !hasReceivedMessage ? (isDarkMode ? '#64748b' : '#94a3b8') : 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: (!isKeyReady || !hasReceivedMessage) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '1rem',
              }}
              onMouseEnter={(e) => {
                if (isKeyReady && hasReceivedMessage) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {!hasReceivedMessage ? 'Waiting for message...' : 'Decrypt & Read'}
            </button>

            <div>
              <p style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                marginBottom: '0.75rem',
              }}>
                Decrypted Message
              </p>
              <div style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                border: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'}`,
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.95rem',
                fontFamily: 'system-ui, sans-serif',
                color: decryptedMessage ? (isDarkMode ? '#cbd5e1' : '#1f2937') : (isDarkMode ? '#64748b' : '#94a3b8'),
                minHeight: '5rem',
                overflowY: 'auto',
                wordWrap: 'break-word',
              }}>
                {decryptedMessage || 'No decrypted message yet...'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}