import { useState, useEffect } from 'react';
import UserPanel from './components/UserPanel';
import NetworkPanel from './components/NetworkPanel';

function App() {
  // Centralized Network State (The Wire)
  const [publicA, setPublicA] = useState('');
  const [publicB, setPublicB] = useState('');
  const [cipherBlocks, setCipherBlocks] = useState([]);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== 'light';
  });

  // Apply theme to document
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen" style={{ 
      background: isDarkMode 
        ? 'linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 50%, #0a0f1c 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)'
    }}>
      <header style={{ 
        borderBottom: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'}`,
        background: isDarkMode 
          ? 'rgba(15, 23, 42, 0.8)' 
          : 'rgba(248, 250, 252, 0.8)',
      }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)', 
                backgroundClip: 'text', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                Secure Exchange Simulator
              </h1>
              <p style={{ 
                color: isDarkMode ? '#94a3b8' : '#64748b', 
                margin: '0.5rem 0 0 0', 
                fontSize: '1rem' 
              }}>
                Interactive Diffie-Hellman Key Exchange & AES-128 Encryption
              </p>
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: isDarkMode ? '#1f2937' : '#e2e8f0',
                border: `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`,
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDarkMode ? '#cbd5e1' : '#1f2937' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isDarkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(2, 132, 199, 0.2)',
                color: isDarkMode ? '#38bdf8' : '#0284c7',
                fontSize: '0.75rem',
                fontWeight: '700',
              }}>
                ✓
              </span>
              <span>Educational Cryptography Simulator</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDarkMode ? '#cbd5e1' : '#1f2937' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)',
                color: isDarkMode ? '#a78bfa' : '#7c3aed',
                fontSize: '0.75rem',
                fontWeight: '700',
              }}>
                ✓
              </span>
              <span>Real-time Key Exchange & Encryption</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 200px)' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ 
            background: isDarkMode ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.05)', 
            border: isDarkMode ? '1px solid rgba(14, 165, 233, 0.3)' : '1px solid rgba(2, 132, 199, 0.2)', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            marginBottom: '2.5rem' 
          }}>
            <h3 style={{ color: isDarkMode ? '#38bdf8' : '#0284c7', marginBottom: '0.5rem' }}>How it works:</h3>
            <p style={{ color: isDarkMode ? '#cbd5e1' : '#1f2937', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>
              Enter a private key for each user → They exchange public values → A shared cryptographic key is derived → Messages are encrypted with AES-128 → Data is transmitted across the public network → The recipient decrypts using the shared key
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            
            {/* User A Environment */}
            <UserPanel 
              title="User A" 
              colorClass="border-sky-500"
              remotePublicValue={publicB} 
              incomingCipherBlocks={[]}
              onPublicValueGenerated={setPublicA}
              onCiphertextGenerated={setCipherBlocks}
              isDarkMode={isDarkMode}
            />

            {/* The Network */}
            <NetworkPanel 
              publicA={publicA}
              publicB={publicB}
              cipherBlocks={cipherBlocks}
              isDarkMode={isDarkMode}
            />

            {/* User B Environment */}
            <UserPanel 
              title="User B" 
              colorClass="border-indigo-500"
              remotePublicValue={publicA}
              incomingCipherBlocks={cipherBlocks}
              onPublicValueGenerated={setPublicB}
              onCiphertextGenerated={() => {}}
              isDarkMode={isDarkMode}
            />

          </div>

           {/* Footer Info */}
           <div style={{ 
             marginTop: '2rem', 
             paddingTop: '2rem', 
             borderTop: `1px solid ${isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'}`, 
             textAlign: 'center', 
             color: isDarkMode ? '#94a3b8' : '#64748b', 
             fontSize: '0.9rem' 
           }}>
             <p style={{ margin: '0.5rem 0' }}>
               Using Diffie-Hellman (p=199, g=127) with AES-128 encryption • CryptoJS library
             </p>
             <p style={{ margin: '0.5rem 0' }}>
               Melody Ann Garbo
             </p>
           </div>
        </div>
      </main>
    </div>
  );
}

export default App;