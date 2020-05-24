import React from "react";
import { Input } from "reactstrap";

import { FormGroup } from "./formGroup";
import { FieldFormki } from "..";

export const FieldInput = ({ field, form, ...props }: FieldFormki) => {
  const hasError = Boolean(form.errors[field.name]);

  return (
    <FormGroup hasError={hasError} name={field.name} icon={true}>
      <Input
        type="text"
        className={hasError ? "is-invalid" : undefined}
        {...props}
        {...field}
      />
    </FormGroup>
  );
};
