'use client';

import { useEffect } from 'react';

export default function ConnectReturnPage() {
  useEffect(() => {
    // Attempt to deep link back to the app
    const deepLinkUrl = 'com.discr.app://connect-return';

    // Try to open the app via deep link
    window.location.href = deepLinkUrl;

    // Fallback: close window after 3 seconds if deep link doesn't work
    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        fontSize: '64px',
        marginBottom: '24px'
      }}>
        ✅
      </div>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#2ECC71'
      }}>
        Payout Setup Complete!
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#666',
        marginBottom: '8px'
      }}>
        You can now receive reward payments via credit card.
      </p>
      <p style={{
        fontSize: '14px',
        color: '#999',
        marginTop: '24px'
      }}>
        Returning to the app...
      </p>
      <p style={{
        fontSize: '12px',
        color: '#bbb',
        marginTop: '8px'
      }}>
        If the app doesn&apos;t open, you can close this window and return manually.
      </p>
    </div>
  );
}
