/* eslint-disable react/prop-types */
import React from 'react';

import './styles.scss';

export default function RadioButton({
  id,
  name,
  changed,
  value,
  isSelected,
  label,
  onFocus,
}) {
  return (
    <div className="RadioButton">
      <input
        id={id}
        name={name}
        onChange={changed}
        onFocus={onFocus}
        value={value}
        type="radio"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
