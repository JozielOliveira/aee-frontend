import React from "react";

export const CheckBoxButton = ({
  id,
  label,
  name,
  register
}: any) => {
  return (
    <div className="custom-control custom-checkbox mb-3">
      <input
        name={name}
        id={`${name}-${id}`}
        type="checkbox"
        value={label}
        className="custom-control-input"
        ref={register()}
      />
      <label className="custom-control-label" htmlFor={`${name}-${id}`}>{label}</label>
    </div>
  );
};
