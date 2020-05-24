import React from "react";
import { FormGroup as FormGroupBase } from "reactstrap";
import { ErrorMessage } from "formik";

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
  return (
    <FormGroupBase className={hasError && icon ? "has-danger" : undefined}>
      {children}
      <ErrorMessage name={name}>
        {(errorMessage) => <p className="text-danger mb-0">{errorMessage}</p>}
      </ErrorMessage>
    </FormGroupBase>
  );
};
