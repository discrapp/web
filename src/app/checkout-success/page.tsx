'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Attempt to deep link back to the app
    const deepLinkUrl = `com.discr.app://checkout/success${orderId ? `?order_id=${orderId}` : ''}`;

    // Try to open the app via deep link
    window.location.href = deepLinkUrl;

    // Fallback: close window after 3 seconds if deep link doesn't work
    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
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
        color: '#27AE60'
      }}>
        Payment Successful!
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#666',
        marginBottom: '8px'
      }}>
        Your order has been placed successfully.
      </p>
      {orderId && (
        <p style={{
          fontSize: '14px',
          color: '#999'
        }}>
          Order ID: {orderId}
        </p>
      )}
      <p style={{
        fontSize: '14px',
        color: '#999',
        marginTop: '24px'
      }}>
        You can close this window and return to the app.
      </p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
          <LoadingSpinner size="lg" message="Processing payment..." />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
