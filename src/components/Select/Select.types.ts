export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps {
  value?: any;
  onChange?: (value: any) => void;
  options?: SelectOption[];
  label?: string;
}
