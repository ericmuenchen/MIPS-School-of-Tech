import React from 'react';

/**
 * Pill button props.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** solid = navy fill, maize = yellow accent (max one per screen), outline = navy border */
  variant?: 'solid' | 'maize' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Pill button in the MIPS style. Solid navy is the default action; reserve
 * maize for a single primary CTA; outline for secondary actions.
 * @startingPoint section="Core" subtitle="Pill button: solid, maize, outline" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
