import React from 'react';

/** Rounded checkbox with navy check. */
export function Checkbox({ label, checked, onChange }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', font: 'var(--text-body-md)', color: 'var(--text-body)' }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: '6px',
          border: 'var(--border-width-md) solid var(--brand-primary)',
          background: checked ? 'var(--brand-primary)' : 'var(--surface-page)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
