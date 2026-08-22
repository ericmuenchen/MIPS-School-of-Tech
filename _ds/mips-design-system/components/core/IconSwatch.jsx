import React from 'react';

/**
 * IconSwatch — the MIPS signature device: a maize rounded-square behind a
 * navy line icon. Pass an inline SVG (or any node) as children.
 */
export function IconSwatch({ size = 38, radius = 'var(--radius-md)', children, ...rest }) {
  return (
    <span
      {...rest}
      style={{
        flex: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: radius,
        background: 'var(--color-maize-500)',
        color: 'var(--color-navy-700)',
      }}
    >
      {children}
    </span>
  );
}
