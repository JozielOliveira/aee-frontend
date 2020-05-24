import React from "react";
import { FieldFormki } from "..";

export const RadioButton = ({
  id,
  label,
  className,
  field: { name, value, onChange, onBlur },
  ...props
}: FieldFormki) => {
  return (
    <div className="custom-control custom-radio mb-3">
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className="custom-control-input"
        {...props}
      />
      <label className="custom-control-label" htmlFor={id}>{label}</label>
    </div>
  );
};
