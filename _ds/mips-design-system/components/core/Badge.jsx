import React from 'react';

/**
 * Badge — small pill label. Navy (default), maize, or muted gray.
 * Used for eyebrows, unit tags, and status chips.
 */
export function Badge({ variant = 'navy', children, ...rest }) {
  const variants = {
    navy: { background: 'var(--color-navy-700)', color: 'var(--color-white)' },
    maize: { background: 'var(--color-maize-500)', color: 'var(--color-navy-700)' },
    muted: { background: 'var(--color-gray-100)', color: 'var(--color-gray-600)' },
  };
  return (
    <span
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: 'var(--radius-pill)',
        font: 'var(--text-caption)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        ...variants[variant],
      }}
    >
      {children}
    </span>
  );
}
