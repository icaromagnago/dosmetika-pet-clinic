/* eslint-disable react/prop-types */
import React from 'react';

import './styles.scss';

export default function Checkbox({
  id,
  name,
  changed,
  value,
  isSelected,
  label,
}) {
  return (
    <div className="md-checkbox">
      <input
        id={id}
        name={name}
        onChange={changed}
        value={value}
        type="checkbox"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
