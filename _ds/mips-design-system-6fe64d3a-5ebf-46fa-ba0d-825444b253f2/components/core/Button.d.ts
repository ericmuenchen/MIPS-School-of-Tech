export interface ButtonProps {
  children: React.ReactNode;
  /** outline = default (thin navy outline, white bg); solid = navy fill; maize = yellow highlight, use sparingly */
  variant?: 'outline' | 'solid' | 'maize';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
