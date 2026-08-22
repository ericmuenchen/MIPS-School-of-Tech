import React from 'react';

/**
 * InfoCard — the MIPS surface panel. `tone` picks the treatment:
 *  - plain: white surface with soft shadow (default)
 *  - maize: light maize-50 highlight panel
 *  - navy:  inverted navy panel for emphasis blocks (e.g. AI policy)
 */
export function InfoCard({ tone = 'plain', label, children, ...rest }) {
  const tones = {
    plain: {
      background: 'var(--color-white)',
      boxShadow: 'var(--shadow-md)',
      color: 'var(--color-gray-600)',
      labelColor: 'var(--color-navy-700)',
    },
    maize: {
      background: 'var(--color-maize-50)',
      color: 'var(--color-gray-600)',
      labelColor: 'var(--color-navy-700)',
    },
    navy: {
      background: 'var(--color-navy-700)',
      color: 'var(--color-white)',
      labelColor: 'var(--color-maize-500)',
    },
  };
  const t = tones[tone];
  return (
    <div
      {...rest}
      style={{
        background: t.background,
        boxShadow: t.boxShadow,
        color: t.color,
        borderRadius: 'var(--radius-lg)',
        padding: '22px 24px',
      }}
    >
      {label && (
        <div style={{
          font: 'var(--text-label)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: t.labelColor,
          marginBottom: 10,
        }}>{label}</div>
      )}
      {children}
    </div>
  );
}
