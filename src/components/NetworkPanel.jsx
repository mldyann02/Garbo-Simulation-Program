export default function NetworkPanel({ publicA, publicB, cipherBlocks, isDarkMode }) {
  const encryptedMessage = cipherBlocks && cipherBlocks.length > 0 
    ? cipherBlocks.join('') 
    : '';

  return (
    <div style={{
      background: isDarkMode ? '#111827' : '#ffffff',
      border: isDarkMode ? '2px solid rgba(239, 68, 68, 0.4)' : '2px solid rgba(220, 38, 38, 0.3)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isDarkMode 
        ? '0 0 20px rgba(239, 68, 68, 0.1), 0 10px 30px rgba(0, 0, 0, 0.3)'
        : '0 0 20px rgba(220, 38, 38, 0.08), 0 10px 30px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(220, 38, 38, 0.2)',
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.03) 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{
            margin: '0 0 0.25rem 0',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: isDarkMode ? '#fca5a5' : '#991b1b',
          }}>
            Public Network
          </h2>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: isDarkMode ? '#fb7185' : '#b91c1c',
          }}>
            Exposed to eavesdroppers
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
          background: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(220, 38, 38, 0.15)',
          color: isDarkMode ? '#fca5a5' : '#dc2626',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isDarkMode ? '#ef4444' : '#dc2626',
            animation: 'pulse 1s infinite',
          }}></span>
          Unsecured
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{
          background: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.08)',
          border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(220, 38, 38, 0.15)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          color: isDarkMode ? '#cbd5e1' : '#1f2937',
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            <strong>Public values and encrypted data transmitted here</strong>
          </p>
          <p style={{ margin: 0, color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>
            Private keys NEVER transmitted. Encrypted messages are observable but cannot be read without the shared key.
          </p>
        </div>

        <div style={{ space: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
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
                A
              </span>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                User A Public Value
              </p>
              <span style={{
                marginLeft: 'auto',
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: publicA 
                  ? (isDarkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(2, 132, 199, 0.2)')
                  : (isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)'),
                color: publicA 
                  ? (isDarkMode ? '#38bdf8' : '#0284c7')
                  : (isDarkMode ? '#94a3b8' : '#64748b'),
              }}>
                {publicA ? 'Visible' : 'Pending'}
              </span>
            </div>
            <div style={{
              background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
              border: publicA 
                ? (isDarkMode ? '1px solid rgba(14, 165, 233, 0.3)' : '1px solid rgba(2, 132, 199, 0.2)')
                : (isDarkMode ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(203, 213, 225, 0.5)'),
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.9rem',
              fontFamily: '"Fira Code", monospace',
              color: publicA 
                ? (isDarkMode ? '#cbd5e1' : '#1f2937')
                : (isDarkMode ? '#64748b' : '#94a3b8'),
              wordBreak: 'break-all',
              minHeight: '2.5rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              {publicA || '—'}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
                color: isDarkMode ? '#818cf8' : '#4f46e5',
                fontSize: '0.75rem',
                fontWeight: '700',
              }}>
                B
              </span>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                User B Public Value
              </p>
              <span style={{
                marginLeft: 'auto',
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: publicB 
                  ? (isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)')
                  : (isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)'),
                color: publicB 
                  ? (isDarkMode ? '#818cf8' : '#4f46e5')
                  : (isDarkMode ? '#94a3b8' : '#64748b'),
              }}>
                {publicB ? 'Visible' : 'Pending'}
              </span>
            </div>
            <div style={{
              background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
              border: publicB 
                ? (isDarkMode ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(79, 70, 229, 0.2)')
                : (isDarkMode ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(203, 213, 225, 0.5)'),
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.9rem',
              fontFamily: '"Fira Code", monospace',
              color: publicB 
                ? (isDarkMode ? '#cbd5e1' : '#1f2937')
                : (isDarkMode ? '#64748b' : '#94a3b8'),
              wordBreak: 'break-all',
              minHeight: '2.5rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              {publicB || '—'}
            </div>
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)',
                color: isDarkMode ? '#d8b4fe' : '#7c3aed',
                fontSize: '0.75rem',
                fontWeight: '700',
                fontFamily: 'monospace',
              }}>
                [E]
              </span>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isDarkMode ? '#cbd5e1' : '#1f2937',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Encrypted Message
              </p>
              <span style={{
                marginLeft: 'auto',
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: encryptedMessage 
                  ? (isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)')
                  : (isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)'),
                color: encryptedMessage 
                  ? (isDarkMode ? '#d8b4fe' : '#7c3aed')
                  : (isDarkMode ? '#94a3b8' : '#64748b'),
              }}>
                {encryptedMessage 
                  ? `${(encryptedMessage.length / 16).toFixed(0)} blocks`
                  : 'Waiting'
                }
              </span>
            </div>
            <div style={{
              background: encryptedMessage
                ? (isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)')
                : (isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)'),
              border: encryptedMessage 
                ? (isDarkMode ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(124, 58, 237, 0.2)')
                : (isDarkMode ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(203, 213, 225, 0.5)'),
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.85rem',
              fontFamily: '"Fira Code", monospace',
              color: encryptedMessage 
                ? (isDarkMode ? '#cbd5e1' : '#1f2937')
                : (isDarkMode ? '#64748b' : '#94a3b8'),
              wordBreak: 'break-all',
              minHeight: '120px',
              maxHeight: '200px',
              overflowY: 'auto',
              lineHeight: '1.5',
            }}>
              {encryptedMessage 
                ? cipherBlocks.map((block, idx) => (
                    <div key={idx} style={{
                      marginBottom: '0.5rem',
                      padding: '0.5rem',
                      background: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                      borderRadius: '4px',
                    }}>
                      Block {idx + 1}: {block}
                    </div>
                  ))
                : '—'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}