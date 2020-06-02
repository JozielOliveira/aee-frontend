import React from "react";
import { Input } from "reactstrap";

import { FormGroup } from "./formGroup";

export const FieldInput = ({ hasError, register, ...props }: any) => {
  return (
    <FormGroup hasError={hasError} name={props.name} icon={true}>
      <Input
        type="text"
        className={hasError ? "is-invalid" : undefined}
        innerRef={register}
        {...props}
      />
    </FormGroup>
  );
};
