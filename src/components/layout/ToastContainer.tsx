import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 1000,
        maxWidth: '380px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => {
        const getStyles = () => {
          switch (toast.type) {
            case 'success':
              return {
                bg: '#ffffff',
                border: '#86efac',
                text: '#166534',
                icon: <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
              };
            case 'warning':
              return {
                bg: '#ffffff',
                border: '#fde68a',
                text: '#92400e',
                icon: <AlertTriangle size={16} style={{ color: '#d97706' }} />
              };
            case 'error':
              return {
                bg: '#ffffff',
                border: '#fca5a5',
                text: '#991b1b',
                icon: <AlertCircle size={16} style={{ color: '#dc2626' }} />
              };
            case 'info':
            default:
              return {
                bg: '#ffffff',
                border: '#b2c5bd',
                text: '#0f352e',
                icon: <Info size={16} style={{ color: '#194d43' }} />
              };
          }
        };

        const st = getStyles();

        return (
          <div
            key={toast.id}
            role="status"
            className="animate-fade-in"
            style={{
              backgroundColor: st.bg,
              border: `1.5px solid ${st.border}`,
              borderRadius: '8px',
              padding: '12px 14px',
              boxShadow: '0 8px 24px rgba(15, 53, 46, 0.12)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              pointerEvents: 'auto'
            }}
          >
            <div style={{ flexShrink: 0, marginTop: '2px' }}>{st.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: st.text, lineHeight: 1.2, marginBottom: '2px' }}>
                {toast.title}
              </div>
              {toast.description && (
                <div style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.35 }}>
                  {toast.description}
                </div>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              style={{
                color: '#768a84',
                padding: '2px',
                borderRadius: '4px',
                flexShrink: 0
              }}
              title="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
