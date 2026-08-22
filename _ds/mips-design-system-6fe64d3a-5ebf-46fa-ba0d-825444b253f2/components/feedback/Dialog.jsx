import React from 'react';

/** Centered modal dialog with scrim, rounded card, close button. */
export function Dialog({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20,20,20,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--space-6)',
          maxWidth: 440,
          width: '90%',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 20,
            color: 'var(--text-body)',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
        {title && <h3 style={{ font: 'var(--text-display-sm)', marginBottom: 'var(--space-4)' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
