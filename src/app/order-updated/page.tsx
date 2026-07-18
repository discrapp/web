'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OrderUpdatedContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const status = searchParams.get('status');
  const error = searchParams.get('error');

  // Error state
  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>&#10060;</div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#dc2626',
            }}
          >
            Update Failed
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '8px',
            }}
          >
            {decodeURIComponent(error)}
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#999',
              marginTop: '24px',
            }}
          >
            You can close this window.
          </p>
        </div>
      </div>
    );
  }

  // Success state
  const statusDisplay = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Updated';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            marginBottom: '24px',
            color: '#22c55e',
          }}
        >
          &#10004;
        </div>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#333',
          }}
        >
          Order Updated!
        </h1>
        {orderNumber && (
          <p
            style={{
              fontSize: '16px',
              color: '#667eea',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            {orderNumber}
          </p>
        )}
        <p
          style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '8px',
          }}
        >
          Status: <strong>{statusDisplay}</strong>
        </p>
        <p
          style={{
            fontSize: '14px',
            color: '#999',
            marginTop: '24px',
          }}
        >
          You can close this window.
        </p>
      </div>
    </div>
  );
}

export default function OrderUpdatedPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Loading...
        </div>
      }
    >
      <OrderUpdatedContent />
    </Suspense>
  );
}
