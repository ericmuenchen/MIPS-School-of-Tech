import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'navy' | 'maize' | 'muted';
  children?: React.ReactNode;
}

/**
 * Small uppercase pill label for eyebrows, unit tags, and status chips.
 */
export function Badge(props: BadgeProps): JSX.Element;
