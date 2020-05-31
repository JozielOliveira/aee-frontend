import React from 'react';
import { FieldArray } from "formik";
import { Container, Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { Button } from "reactstrap";

import { Input, SelectInputType } from "components";
import { BuildQuestionType, BuidQuestionsProps } from "types";

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

export const BuilderQuestions: React.FC<BuidQuestionsProps> = ({ step_id, questions }) => {
  const initialQuestion: BuildQuestionType = { position: 0, question_title: '', question_type: 'Multipla Escolha', question_answer: '', question_options: [{ label: 'teste' }] }

  return (
    <FieldArray
      name={`steps[${step_id}].questions`}
      render={arrayHelpers => (
        <>
          {questions.map((question: BuildQuestionType, question_id: number) => (
            <Container key={question_id} className="mb-5">
              <Card className="shadow">
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
                        type={question.question_type}
                        step_id={step_id}
                        question_id={question_id}
                        options={question.question_options}
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => arrayHelpers.push({ ...initialQuestion, postion: question_id + 1 })} className="btn-1 ml-1" color="success">
                    Adicionar Questão
                  </Button>
                </CardFooter>
              </Card>
            </Container>
          ))}
        </>
      )}
    />
  )
}
