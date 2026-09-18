export interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
