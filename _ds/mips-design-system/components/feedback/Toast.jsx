import React from 'react';

/** Toast notification banner, success/info/error, dismissible. */
export function Toast({ tone = 'info', children, onDismiss }) {
  const tones = {
    info: { background: 'var(--brand-primary)', color: 'var(--text-on-navy)' },
    success: { background: 'var(--color-navy-700, #1B2A63)', color: 'var(--text-on-navy)' },
    error: { background: 'var(--state-error)', color: '#fff' },
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        font: 'var(--text-body-sm)',
        boxShadow: 'var(--shadow-lg)',
        ...tones[tone],
      }}
    >
      <span style={{ flex: 1 }}>{children}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 18, lineHeight: 1, opacity: 0.8 }}
        >
          ×
        </button>
      )}
    </div>
  );
}
