import React from 'react';

export interface AccentRuleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** px width of the pill */
  width?: number;
}

/**
 * Short maize pill that sits above a section heading. The recurring MIPS
 * section-start marker; place one before each <h2>.
 */
export function AccentRule(props: AccentRuleProps): JSX.Element;
