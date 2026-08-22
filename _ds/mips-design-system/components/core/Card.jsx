import React from 'react';

/**
 * Simple white surface card, subtle shadow, generous rounding, no heavy borders.
 * Used for quick-facts tiles, testimonial tiles, program tiles.
 */
export function Card({ children, padding = 'var(--space-6)', style = {} }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
