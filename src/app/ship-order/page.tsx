'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const API_URL = 'https://xhaogdigrsiwxdjmjzgx.supabase.co/functions/v1';

function ShipOrderContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; orderNumber?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* istanbul ignore if -- defensive check, form not rendered without token */
    if (!token) {
      setResult({ success: false, message: 'Missing printer token' });
      return;
    }

    // tracking number is optional

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/update-order-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          printer_token: token,
          status: 'shipped',
          ...(trackingNumber.trim() && { tracking_number: trackingNumber.trim() }),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: 'Order marked as shipped!',
          orderNumber: data.order?.order_number,
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to update order',
        });
      }
    } catch {
      setResult({
        success: false,
        message: 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show result screen after submission
  if (result) {
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
        background: result.success
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '24px',
            color: result.success ? '#22c55e' : '#dc2626',
          }}>
            {result.success ? '\u2714' : '\u2718'}
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#333',
          }}>
            {result.success ? 'Order Shipped!' : 'Update Failed'}
          </h1>
          {result.orderNumber && (
            <p style={{
              fontSize: '16px',
              color: '#667eea',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}>
              {result.orderNumber}
            </p>
          )}
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '8px',
          }}>
            {result.message}
          </p>
          {result.success && trackingNumber && (
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginTop: '8px',
            }}>
              Tracking: <strong>{trackingNumber}</strong>
            </p>
          )}
          <p style={{
            fontSize: '14px',
            color: '#999',
            marginTop: '24px',
          }}>
            You can close this window.
          </p>
          {!result.success && (
            <button
              onClick={() => setResult(null)}
              style={{
                marginTop: '16px',
                padding: '12px 24px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // No token provided
  if (!token) {
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
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>
            &#10060;
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#dc2626',
          }}>
            Invalid Link
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666',
          }}>
            This link is missing the required printer token.
          </p>
        </div>
      </div>
    );
  }

  // Form view
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px',
        }}>
          &#128230;
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#333',
        }}>
          Mark Order as Shipped
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '24px',
        }}>
          Enter the tracking number to complete the shipment
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (optional)"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              marginBottom: '16px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px 24px',
              backgroundColor: isSubmitting ? '#9ca3af' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Mark as Shipped'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ShipOrderPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        Loading...
      </div>
    }>
      <ShipOrderContent />
    </Suspense>
  );
}
