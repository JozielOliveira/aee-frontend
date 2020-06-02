import React from "react";
import { useForm, FormContext } from "react-hook-form";

type FormProps = {
  children: any;
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
};

export const Form = ({ children, initialValues, validationSchema, onSubmit }: FormProps) => {
  const methods = useForm({
    validationSchema,
    defaultValues: initialValues
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <>{children}</>
      </form>
    </FormContext>
  );
};
