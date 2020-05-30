import React from "react";
import { FieldFormki } from "..";

export const CheckBoxButton = ({
  id,
  label,
  className,
  field: { name, value, onChange, onBlur },
  ...props
}: FieldFormki) => {
  return (
    <div className="custom-control custom-checkbox mb-3">
      <input
        name={name}
        id={`${name}-${id}`}
        type="checkbox"
        value={label} // could be something else for output?
        onChange={onChange}
        onBlur={onBlur}
        className="custom-control-input"
        {...props}
      />
      <label className="custom-control-label" htmlFor={`${name}-${id}`}>{label}</label>
    </div>
  );
};
