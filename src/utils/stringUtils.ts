import React from 'react';

export const combineClassNames = (...classNames: string[]): string => {
  return classNames.join(' ');
};

export const checkEmpty = (
  value: string,
  returnValue: string | React.ReactElement
): string | React.ReactElement => {
  return !value ? returnValue : value;
};

export const maxCharacters = (value: string, max: number): string => {
  return value.length > max ? `${value.slice(0, max)}...` : value;
};
