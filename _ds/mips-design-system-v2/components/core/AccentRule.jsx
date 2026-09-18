import React from 'react';

/**
 * AccentRule — the short maize pill divider that precedes every section
 * heading in MIPS documents. Purely decorative.
 */
export function AccentRule({ width = 44, ...rest }) {
  return (
    <div
      {...rest}
      aria-hidden="true"
      style={{
        height: 5,
        width,
        background: 'var(--color-maize-500)',
        borderRadius: 'var(--radius-pill)',
      }}
    />
  );
}
