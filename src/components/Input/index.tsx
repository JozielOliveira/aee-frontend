import React from "react";
import { InputProps as InputPropsReactStrap } from "reactstrap";
import { Field, FieldProps } from "formik";

import { QuestionType } from "types";
import { FieldBoolean, FieldInput, FieldOptions } from "./components";

export type FieldFormki = InputPropsReactStrap & FieldProps;

export type Option = {
  label: string;
  disabled?: boolean;
};

export type FieldOptionsProps = FieldFormki & {
  options: Option[];
};

const TypesInput = {
  text: (props: FieldFormki) => <FieldInput type="text" {...props} />,
  number: (props: FieldFormki) => <FieldInput type="number" {...props} />,
  boolean: (props: FieldFormki) => <FieldBoolean {...props} />,
  options: (props: FieldOptionsProps) => <FieldOptions type="radio" {...props} />,
  // Next version
  checklist: (props: FieldOptionsProps) => <FieldOptions type="checkbox" {...props} />,
  file: () => { },
};

export type InputProps = QuestionType & {
  step_id?: string;
  question_id?: number;
  disabled?: boolean;
  options?: Option[];
  todoList?: boolean;
};

export const Label = (props: { value: string }) => (
  <div className="mb-3">
    <small className="text-uppercase font-weight-bold">{props.value}</small>
  </div>
);

export const Description = (props: { value: string }) => (
  <p className="description">{props.value}</p>
);

export const Input = ({ type, label, description, ...props }: InputProps) => {
  const InputCustom = TypesInput[type];
  return (
    <>
      {label && <Label value={label} />}
      {description && <Description value={description} />}
      <Field component={InputCustom} {...props} />
    </>
  );
};
