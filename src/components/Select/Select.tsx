import * as RSelect from '@radix-ui/react-select';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';
import React from 'react';
import './_styles.select.scss';
import { SelectProps } from './Select.types';

const Select = ({ options, value, onChange, label }: SelectProps) => (
  <div className='input-container'>
    {label && <label>{label}</label>}
    <RSelect.Root value={value} onValueChange={onChange}>
      <RSelect.Trigger className='select-trigger'>
        <RSelect.Value placeholder='Select' />
        <RSelect.Icon>
          <HiOutlineChevronUpDown />
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content
          avoidCollisions={false}
          align='center'
          className='select-content'
        >
          <RSelect.ScrollUpButton className='select-scroll-button'>
            <FaChevronUp />
          </RSelect.ScrollUpButton>
          <RSelect.Viewport className='select-viewport'>
            <RSelect.Group>
              {options?.map((option) => (
                <SelectItem value={option.value}>{option.label}</SelectItem>
              ))}
            </RSelect.Group>
          </RSelect.Viewport>
          <RSelect.ScrollDownButton className='select-scroll-button'>
            <FaChevronDown />
          </RSelect.ScrollDownButton>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  </div>
);

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <RSelect.Item
        className={`select-item ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <RSelect.ItemText>{children}</RSelect.ItemText>
      </RSelect.Item>
    );
  }
);

export default Select;
