import React, { useEffect } from "react";
import { Input } from "..";
import { FormGroup, RadioButton, CheckBoxButton } from ".";
import { Button, Col } from "reactstrap";
import { useFormContext, useFieldArray } from "react-hook-form";

export const FieldOptions = ({ step_id = 0, question_id = 0, type, name, todoList, options, register }: any) => {
  const fieldName = `steps[${step_id}].questions[${question_id}].question_options`
  const fieldTemp = `steps[${step_id}].questions[${question_id}].label`
  const FieldInput: any = type === 'radio' ? RadioButton : CheckBoxButton
  const { errors, control, unregister, setValue, getValues } = useFormContext()
  const nameFields = todoList ? fieldName : 'questoins'
  const { fields, append } = useFieldArray({
    control,
    name: nameFields
  });

  useEffect(() => {
    todoList && register({ name: fieldName, value: [] })

    return () => unregister(fieldTemp)
  }, [])

  const add = (label: string) => {
    append({ label })
    setValue(fieldName, [...getValues(fieldName), { label }].filter(a => a && a.label !== ''))
    setValue(fieldTemp, '')
  }


  return (
    <FormGroup
      name={name}
      hasError={errors[name]}
    >
      <>
        {options ?
          options.filter((option: any) => option.label !== '').map((option: any, index: any) => (
            <FieldInput
              key={index}
              id={index}
              name={name}
              label={option.label}
              register={register}
            />)) :
          <Col>
            {fields.filter((option: any) => option.label !== '').map((option: any, index: any) => (
              <FieldInput
                key={index}
                id={index}
                name={name}
                label={option.label}
                register={register}
              />
            ))}
            <Input
              id={`${step_id}-${question_id}-4`}
              name={fieldTemp}
              type="text"
            />
            <Button
              onClick={() => add(getValues(fieldTemp))}
              className="btn-1 ml-1"
              color="success"
            >
              Adicionar
          </Button>
          </Col>
        }
      </>
    </FormGroup>
  );
};
