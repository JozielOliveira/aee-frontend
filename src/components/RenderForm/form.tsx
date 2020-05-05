import React from "react";
import { Formik, Form as FormComponent, FormikConfig } from "formik";

type FormProps<T> = FormikConfig<T> & {
  children: any;
};

export const Form = ({ children, ...props }: FormProps<any>) => {
  return (
    <Formik {...props}>
      <FormComponent>
        <>{children}</>
      </FormComponent>
    </Formik>
  );
};
