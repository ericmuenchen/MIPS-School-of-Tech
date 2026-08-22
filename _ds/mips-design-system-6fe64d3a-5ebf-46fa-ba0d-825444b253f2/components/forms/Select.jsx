import React from 'react';

/** Native-backed select styled to match Input. */
export function Select({ label, options = [], required = false, value, onChange }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-body)' }}>
      {label && (
        <span style={{ font: 'var(--text-label)', color: 'var(--text-headline)' }}>
          {label} {required && <span style={{ color: 'var(--state-error)' }}>*</span>}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          font: 'var(--text-body-md)',
          padding: '11px 16px',
          borderRadius: 'var(--radius-sm)',
          border: 'var(--border-width-thin) solid var(--border-default)',
          color: 'var(--text-body)',
          background: 'var(--surface-page)',
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
