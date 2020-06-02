import React from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Input, SelectInputType } from "components";
import { BuildQuestionType } from "types";

const QuestionTypes = [
  {
    label: "Texto",
  },
  {
    label: "Booleano",
  },
  {
    label: "Multipla Escolha",
  },
  {
    label: "Caixa de seleção",
  },
]

export const BuilderQuestions: React.FC<any> = ({ step_id }) => {
  const initialQuestion: BuildQuestionType = { position: 0, question_title: '', question_type: 'Multipla Escolha', question_answer: '', question_options: QuestionTypes }
  const { watch, control } = useFormContext()
  const { fields, append } = useFieldArray({
    control,
    name: `steps[${step_id}].questions`
  });

  const handleAddQuestion = () => append({ ...initialQuestion, postion: fields.length + 1 })

  return (
    <>
      {fields.map((question: any, question_id: number) => (
        <Card className="shadow mb-5" key={question_id}>
          <CardBody>
            <Row>
              <Col xl='10'>
                <Input
                  id={`${step_id}-${question_id}-1`}
                  name={`steps[${step_id}].questions[${question_id}].question_title`}
                  label="Titulo da questão"
                  type="text"
                />
              </Col>
              <Col xl='2'>
                <Input
                  id={`${step_id}-${question_id}-2`}
                  name={`steps[${step_id}].questions[${question_id}].position`}
                  label="Posição"
                  type="number"
                />
              </Col>
            </Row>
            <Row>
              <Col xl='6'>
                <Input
                  id={`${step_id}-${question_id}-2`}
                  name={`steps[${step_id}].questions[${question_id}].question_type`}
                  label="Tipo da questão"
                  type="options"
                  options={QuestionTypes}
                />
              </Col>
              <Col xl='6'>
                <SelectInputType
                  id={`${step_id}-${question_id}-3`}
                  name={`steps[${step_id}].questions[${question_id}].question_answer`}
                  label='Gabarito'
                  type={watch(`steps[${step_id}].questions[${question_id}].question_type`)}
                  step_id={step_id}
                  question_id={question_id}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
      <Button onClick={handleAddQuestion} className="btn-1 ml-1" color="success">
        Adicionar Questão
      </Button>
    </>
  )
}
