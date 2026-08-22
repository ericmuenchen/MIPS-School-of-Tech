import React from 'react';

export interface IconSwatchProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** px size of the square */
  size?: number;
  /** border radius token or CSS length */
  radius?: string;
  /** the icon, usually an inline SVG with stroke="currentColor" */
  children?: React.ReactNode;
}

/**
 * The MIPS accent motif: navy line icon on a maize rounded square. Icons inherit
 * navy via currentColor. Use for quick-facts, feature rows, and callouts.
 */
export function IconSwatch(props: IconSwatchProps): JSX.Element;
