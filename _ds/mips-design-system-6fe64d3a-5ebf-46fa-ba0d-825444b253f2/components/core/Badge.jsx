import React from 'react';

/**
 * Small pill label for statuses/tags, e.g. "Grades K-5", "New", "Open Enrollment".
 */
export function Badge({ children, tone = 'navy' }) {
  const tones = {
    navy: { background: 'var(--surface-navy)', color: 'var(--text-on-navy)' },
    maize: { background: 'var(--accent-primary)', color: 'var(--brand-primary)' },
    outline: { background: 'transparent', color: 'var(--brand-primary)', border: 'var(--border-width-thin) solid var(--brand-primary)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 14px',
        borderRadius: 'var(--radius-pill)',
        font: 'var(--text-caption)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}
