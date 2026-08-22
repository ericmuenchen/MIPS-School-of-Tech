import React from 'react';

/** Rounded tooltip bubble, navy background, appears above trigger on hover. */
export function Tooltip({ children, label }) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--brand-primary)',
            color: 'var(--text-on-navy)',
            font: 'var(--text-caption)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-md)',
            zIndex: 10,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
