/**
 * Custom combobox option
 */
export interface ComboBoxOption<T> {
    key: string;
    label: string;
    value: T;
    disabled?: boolean;
  }
  