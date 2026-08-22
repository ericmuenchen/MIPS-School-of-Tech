import React from 'react';

/**
 * Surface panel props.
 */
export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** plain = white + shadow, maize = highlight panel, navy = inverted emphasis */
  tone?: 'plain' | 'maize' | 'navy';
  /** optional uppercase eyebrow label */
  label?: string;
  children?: React.ReactNode;
}

/**
 * Surface panel in the MIPS style: white shadowed card, maize highlight, or
 * inverted navy block. Never uses a colored left-border accent.
 * @startingPoint section="Core" subtitle="Surface panel: plain, maize, navy" viewport="700x220"
 */
export function InfoCard(props: InfoCardProps): JSX.Element;
