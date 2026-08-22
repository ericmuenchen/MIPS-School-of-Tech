export interface ToastProps {
  tone?: 'info' | 'success' | 'error';
  children: React.ReactNode;
  onDismiss?: () => void;
}
