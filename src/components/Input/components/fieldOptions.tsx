import React from "react";
import { Field, FieldArray } from "formik";
import { FieldOptionsProps, Input } from "..";
import { FormGroup, RadioButton, CheckBoxButton } from ".";
import { Button, Col } from "reactstrap";

export const FieldOptions = ({ step_id = 0, question_id = 0, type, field, options = [{ label: '' }], todoList = false, form }: FieldOptionsProps) => {
  const fieldName = `steps[${step_id}].questions[${question_id}].question_options`

  return (
    <FormGroup
      name={field.name}
      hasError={Boolean(form.errors[field.name])}
    >
      <FieldArray
        name={fieldName}
        render={arrayHelpers =>
          <Col>
            {options.filter(option => option.label !== '').map((option, index) => (
              <Field
                key={index}
                id={option.label}
                name={field.name}
                label={option.label}
                component={type === 'radio' ? RadioButton : CheckBoxButton}
              />
            ))}
            {todoList &&
              <>
                <Input
                  id={`${step_id}-${question_id}-4`}
                  name={`${fieldName}[${options.length - 1}].label`}
                  type="text"
                />
                <Button onClick={() => arrayHelpers.push({ label: '' })} className="btn-1 ml-1" color="success">
                  Adicionar
              </Button>
              </>
            }
          </Col>
        }
      />
    </FormGroup>
  );
};
