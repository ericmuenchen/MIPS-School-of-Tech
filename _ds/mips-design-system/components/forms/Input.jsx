import React from 'react';

/** Text input with label, helper text, and error state (red asterisk for required). */
export function Input({ label, placeholder, required = false, error, type = 'text', value, onChange }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-body)' }}>
      {label && (
        <span style={{ font: 'var(--text-label)', color: 'var(--text-headline)' }}>
          {label} {required && <span style={{ color: 'var(--state-error)' }}>*</span>}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          font: 'var(--text-body-md)',
          padding: '11px 16px',
          borderRadius: 'var(--radius-sm)',
          border: `var(--border-width-thin) solid ${error ? 'var(--state-error)' : 'var(--border-default)'}`,
          outline: 'none',
          color: 'var(--text-body)',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--state-focus)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = error ? 'var(--state-error)' : 'var(--border-default)')}
      />
      {error && <span style={{ font: 'var(--text-caption)', color: 'var(--state-error)' }}>{error}</span>}
    </label>
  );
}
