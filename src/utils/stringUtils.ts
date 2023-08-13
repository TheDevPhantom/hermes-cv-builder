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
