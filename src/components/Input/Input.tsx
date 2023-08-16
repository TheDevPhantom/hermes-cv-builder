import React, {
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  useState
} from 'react';
import './_styles.input.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputProps {
  icon?: any;
  placeholder?: string;
  tabIndex?: number;
  styling?: string;
  background?: 'float' | 'indented';
  label?: string;
  type?: HTMLInputTypeAttribute | 'textarea';
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  disabled?: boolean;
  error?: string | null;
  rows?: number;
  readOnly?: boolean;
  autoFocus?: boolean;
  isRegInput?: boolean;
}

const Input: FC<InputProps> = ({
  icon,
  placeholder,
  tabIndex = 0,
  styling,
  background,
  label,
  type = 'input',
  onChange,
  name,
  value,
  disabled,
  error,
  rows = 5,
  readOnly = false,
  onBlur,
  autoFocus = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 'textarea') {
    return (
      <div className='input-container'>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
          className='input'
          placeholder={placeholder}
          tabIndex={tabIndex}
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={onBlur}
          autoFocus={autoFocus}
          id={name}
          rows={rows}
        />
      </div>
    );
  }

  return (
    <div className='input-container'>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          className='input'
          placeholder={placeholder}
          tabIndex={tabIndex}
          onChange={onChange}
          name={name}
          type={showPassword ? 'text' : type}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={onBlur}
          autoFocus={autoFocus}
          id={name}
        />
        {type === 'password' && (
          <div className='eye' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
