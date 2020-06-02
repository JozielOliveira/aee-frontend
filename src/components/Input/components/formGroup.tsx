import React from "react";
import { FormGroup as FormGroupBase } from "reactstrap";
import { ErrorMessage, useFormContext } from "react-hook-form";

export interface FormGroupProps {
  name: string;
  icon?: boolean;
  hasError: boolean;
  children: any;
}

export const FormGroup = ({
  name,
  icon,
  hasError,
  children,
}: FormGroupProps) => {
  const { errors } = useFormContext()

  return (
    <FormGroupBase className={hasError && icon ? "has-danger" : undefined}>
      {children}
      <ErrorMessage name={name} errors={errors}>
        {({ message }) => <p className="text-danger mb-0">{message}</p>}
      </ErrorMessage>
    </FormGroupBase>
  );
};
