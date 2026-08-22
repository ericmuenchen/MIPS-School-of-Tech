import React from 'react';

/**
 * Yellow accent circle behind a navy line icon, MIPS's signature
 * visual device (used behind medal/handshake/laptop icons etc).
 * Pass any single-color-stroke icon (e.g. a Lucide icon) as children;
 * it's recolored to navy via currentColor.
 */
export function IconSwatch({ children, size = 72 }) {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--accent-primary)',
      }}
    >
      <span
        style={{
          position: 'relative',
          color: 'var(--brand-primary)',
          width: size * 0.56,
          height: size * 0.56,
          display: 'inline-flex',
        }}
      >
        {children}
      </span>
    </span>
  );
}
