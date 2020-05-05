import React from "react";
import {
  Input as InputBase,
  InputProps as InputPropsReactStrap,
} from "reactstrap";
import { FieldProps } from "formik";

export type FieldFormki = InputPropsReactStrap & FieldProps;

const TypesInput = {
  text: ({ field, ...props }: FieldFormki) => (
    <InputBase type="text" {...field} {...props} />
  ),
  number: ({ field, ...props }: FieldFormki) => (
    <InputBase type="number" {...field} {...props} />
  ),
  boolean: ({ field, ...props }: FieldFormki) => (
    <label className="custom-toggle">
      <input
        type="checkbox"
        checked={Boolean(field.value)}
        {...field}
        {...props}
      />
      <span className="custom-toggle-slider rounded-circle" />
    </label>
  ),
  // Next version
  // 'checklist': (props) => {},
  // 'options': (props) => {},
  // 'file': (props) => {},
};

export type InputType = keyof typeof TypesInput;

export type InputProps = FieldFormki & {
  type: InputType;
};

export const Input = ({ type, ...props }: InputProps) => {
  const InputCustom = TypesInput[type];
  return <InputCustom {...props} />;
};
