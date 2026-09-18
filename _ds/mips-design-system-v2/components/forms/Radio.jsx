import React from 'react';

/** Circular radio button with navy dot. */
export function Radio({ label, checked, onChange, name }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', font: 'var(--text-body-md)', color: 'var(--text-body)' }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: 'var(--border-width-md) solid var(--brand-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand-primary)' }} />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
