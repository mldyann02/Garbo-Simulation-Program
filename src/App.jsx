import { useState } from 'react';
import UserPanel from './components/UserPanel';
import NetworkPanel from './components/NetworkPanel';

function App() {
  // Centralized Network State (The Wire)
  const [publicA, setPublicA] = useState('');
  const [publicB, setPublicB] = useState('');
  const [cipherBlocks, setCipherBlocks] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Secure Information Exchange Simulation</h1>
        <p className="text-gray-600 mt-2">Diffie-Hellman Key Exchange & AES-128 Encryption</p>
      </header>

      {/* Three-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* User A Environment */}
        <UserPanel 
          title="User A" 
          colorClass="border-blue-500"
          remotePublicValue={publicB} 
          incomingCipherBlocks={[]} // In this sim, A is the sender
          onPublicValueGenerated={setPublicA}
          onCiphertextGenerated={setCipherBlocks}
        />

        {/* The Network */}
        <NetworkPanel 
          publicA={publicA}
          publicB={publicB}
          cipherBlocks={cipherBlocks}
        />

        {/* User B Environment */}
        <UserPanel 
          title="User B" 
          colorClass="border-green-500"
          remotePublicValue={publicA}
          incomingCipherBlocks={cipherBlocks} // B receives the array A sends
          onPublicValueGenerated={setPublicB}
          onCiphertextGenerated={() => {}} // Empty function, B is just receiving
        />

      </div>
    </div>
  );
}

export default App;