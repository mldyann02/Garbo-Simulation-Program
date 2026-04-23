export default function NetworkPanel({ publicA, publicB, cipherBlocks }) {
  // Concatenate the array of 16-character blocks into one single string
  const encryptedMessage = cipherBlocks && cipherBlocks.length > 0 
    ? cipherBlocks.join('') 
    : '';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-yellow-500 text-gray-200">
      <h2 className="text-xl font-bold mb-4 text-yellow-400">Public Network</h2>
      <p className="text-sm text-gray-400 mb-4">Data visible to eavesdroppers.</p>
      
      <div className="space-y-4 font-mono text-sm break-all">
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <span className="text-blue-400 block mb-1">User A Public Value:</span>
          <p>{publicA || '---'}</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <span className="text-green-400 block mb-1">User B Public Value:</span>
          <p>{publicB || '---'}</p>
        </div>

        <div className="bg-gray-900 p-3 rounded border border-gray-700">
          <span className="text-red-400 block mb-1">Encrypted Ciphertext:</span>
          <p>{encryptedMessage || '---'}</p>
        </div>
      </div>
    </div>
  );
}