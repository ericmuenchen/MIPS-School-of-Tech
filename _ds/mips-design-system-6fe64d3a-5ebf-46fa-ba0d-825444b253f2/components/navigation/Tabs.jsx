import React from 'react';

/** Underline-indicator tab bar. */
export function Tabs({ tabs = [], active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', borderBottom: 'var(--border-width-thin) solid var(--border-default)' }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange && onChange(t)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '12px 2px',
            font: t === active ? '700 16px var(--font-body)' : '400 16px var(--font-body)',
            color: t === active ? 'var(--brand-primary)' : 'var(--text-body)',
            borderBottom: t === active ? '3px solid var(--accent-primary)' : '3px solid transparent',
            marginBottom: '-1.5px',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
