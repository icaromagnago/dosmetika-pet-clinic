/* eslint-disable react/prop-types */
import React from 'react';

import './styles.scss';

export default function RadioButton({ id, changed, value, isSelected, label }) {
  return (
    <div className="RadioButton">
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
