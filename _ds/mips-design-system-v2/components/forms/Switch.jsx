import React from 'react';

/** Toggle switch, navy when on. */
export function Switch({ checked, onChange, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', font: 'var(--text-body-md)', color: 'var(--text-body)' }}>
      <span
        onClick={() => onChange && onChange(!checked)}
        style={{
          width: 42,
          height: 24,
          borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--brand-primary)' : 'var(--gray-300, #d8d8d8)',
          position: 'relative',
          transition: 'background 150ms ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 21 : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'white',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left 150ms ease',
          }}
        />
      </span>
      {label}
    </label>
  );
}
