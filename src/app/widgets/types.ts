export interface ComboBoxOption<T> {
  key: string;
  label: string;
  value: T;
  disabled?: boolean;
}

export interface ProgressOutput<T> {
  loading?: boolean;
  value?: T;
  error?: Error;
}

export interface PasswordChangeDetails{
  loginId:string;
  password:string;
  userID:string;
}
