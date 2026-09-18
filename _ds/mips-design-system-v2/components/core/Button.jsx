import React from 'react';

/**
 * MIPS pill button. Three variants: solid navy, maize accent, and outline.
 * Always fully pill-shaped; hover deepens color by one step (no opacity fades).
 */
export function Button({ variant = 'solid', size = 'md', disabled = false, children, ...rest }) {
  const [hover, setHover] = React.useState(false);

  const sizes = {
    sm: { padding: '8px 18px', font: "600 13px/1 var(--font-ui)" },
    md: { padding: '12px 26px', font: "600 15px/1 var(--font-ui)" },
    lg: { padding: '15px 34px', font: "600 17px/1 var(--font-ui)" },
  };

  const variants = {
    solid: {
      background: hover ? 'var(--brand-primary-hover)' : 'var(--brand-primary)',
      color: 'var(--color-white)',
      border: '2px solid transparent',
    },
    maize: {
      background: hover ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: 'var(--color-navy-700)',
      border: '2px solid transparent',
    },
    outline: {
      background: hover ? 'var(--color-gray-100)' : 'transparent',
      color: 'var(--color-navy-700)',
      border: '2px solid var(--color-navy-700)',
    },
  };

  return (
    <button
      {...rest}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...sizes[size],
        ...variants[variant],
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background 140ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}
