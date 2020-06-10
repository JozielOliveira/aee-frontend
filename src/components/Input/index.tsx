import React from "react";
import { useFormContext } from "react-hook-form";

import { QuestionType } from "types";
import { FieldBoolean, FieldInput, FieldOptions, Datepicker } from "./components";


export type Option = {
  label: string;
  disabled?: boolean;
};

const TypesInput = {
  text: (props: any) => <FieldInput type="text" {...props} />,
  number: (props: any) => <FieldInput type="number" {...props} />,
  date: (props: any) => <Datepicker {...props} />,
  boolean: (props: any) => <FieldBoolean {...props} />,
  options: (props: any) => <FieldOptions type="radio" {...props} />,
  // Next version
  checklist: (props: any) => <FieldOptions type="checkbox" {...props} />,
  file: () => { },
};

export type InputProps = QuestionType & {
  step_id?: string;
  question_id?: number;
  disabled?: boolean;
  options?: Option[];
  todoList?: boolean;
  [x: string]: any;
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
  const { errors, register } = useFormContext()

  const hasError = errors[props.name];

  const InputCustom = TypesInput[type];
  return (
    <>
      {label && <Label value={label} />}
      {description && <Description value={description} />}
      <InputCustom {...props} hasError={hasError} register={register} />
    </>
  );
};
