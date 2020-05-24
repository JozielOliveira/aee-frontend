import React from "react";
import { Field } from "formik";
import { FieldOptionsProps } from "..";
import { FormGroup, RadioButton } from ".";

export const FieldOptions = ({ field, options, form }: FieldOptionsProps) => {
  return (
    <FormGroup
      name={field.name}
      hasError={Boolean(form.errors[field.name])}
    >
      {options.map((option, index) => (
        <Field
          key={index}
          id={option.label}
          name={field.name}
          label={option.label}
          component={RadioButton}
        />
      ))}
    </FormGroup>
  );
};
