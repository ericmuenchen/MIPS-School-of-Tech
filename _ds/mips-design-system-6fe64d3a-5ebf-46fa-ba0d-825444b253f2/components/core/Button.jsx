import React from 'react';

/**
 * Pill-shaped button, MIPS's primary interactive control.
 * Variants: "outline" (thin navy outline, dark text, used for most CTAs
 * like "Student Login" / "Get Started"), "solid" (navy fill, white text,
 * for the single strongest CTA on a screen), "maize" (yellow fill, navy
 * text, for high-energy highlight moments, use sparingly).
 */
export function Button({
  children,
  variant = 'outline',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  type = 'button',
}) {
  const sizes = {
    sm: { padding: '8px 20px', font: 'var(--text-label)' },
    md: { padding: '13px 30px', font: '600 16px/1.2 var(--font-body)' },
    lg: { padding: '17px 40px', font: '600 18px/1.2 var(--font-body)' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 150ms ease',
    opacity: disabled ? 0.45 : 1,
    ...sizes[size],
  };

  const variants = {
    outline: {
      background: 'var(--surface-page)',
      color: 'var(--brand-primary)',
      border: 'var(--border-width-thin) solid var(--brand-primary)',
    },
    solid: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-navy)',
      border: 'var(--border-width-thin) solid var(--brand-primary)',
    },
    maize: {
      background: 'var(--accent-primary)',
      color: 'var(--brand-primary)',
      border: 'var(--border-width-thin) solid var(--accent-primary)',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'outline') e.currentTarget.style.background = 'var(--surface-muted)';
        if (variant === 'solid') e.currentTarget.style.background = 'var(--brand-primary-hover)';
        if (variant === 'maize') e.currentTarget.style.background = 'var(--accent-primary-hover)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (variant === 'outline') e.currentTarget.style.background = 'var(--surface-page)';
        if (variant === 'solid') e.currentTarget.style.background = 'var(--brand-primary)';
        if (variant === 'maize') e.currentTarget.style.background = 'var(--accent-primary)';
      }}
    >
      {icon}
      {children}
    </button>
  );
}
