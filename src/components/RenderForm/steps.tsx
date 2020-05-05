import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { FormGroup, Row, Col, Button } from "reactstrap"

import { Form } from './form'
import { Description, Label, Input } from './components'

import { getInitialValue, getValidationSchema } from './utils'
import { QuestionType } from '../../types'

type StepsProps = {
  id: string,
  questions: QuestionType[],
  onSubmit: (id: string, values?: any) => Promise<any>
}

export const Steps = ({ id, questions, onSubmit }: StepsProps) => {
  return(
    <Form
      initialValues={getInitialValue(questions)}
      validationSchema={getValidationSchema(questions)}
      onSubmit={(params: any) => onSubmit(id, params)}
    >
      {questions.map((question, index) =>
        <Row key={index}>
          <Col>
            {question.label && <Label value={question.label} />}
            {question.description && <Description value={question.description} />}
            <FormGroup>
              <Field component={Input} {...question}/>
              <ErrorMessage name={question.name}/>
            </FormGroup>
          </Col>
        </Row>
      )}
      <Button 
        type="submit" 
        className="btn-1 ml-1" 
        color="success"
      >
        Continuar
      </Button>
    </Form>

  )
}