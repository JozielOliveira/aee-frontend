import React from "react";

export const RadioButton = ({
  id,
  label,
  name,
  register
}: any) => {
  return (
    <div className="custom-control custom-radio mb-3">
      <input
        name={name}
        id={`${name}-${id}`}
        type="radio"
        value={label}
        className="custom-control-input"
        ref={register()}
      />
      <label className="custom-control-label" htmlFor={`${name}-${id}`}>{label}</label>
    </div>
  );
};
