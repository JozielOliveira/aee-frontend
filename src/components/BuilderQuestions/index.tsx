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

export const BuilderQuestions: React.FC<BuidQuestionsProps> = ({ questions }) => {
  return (
    <FieldArray
      name="questions"
      render={arrayHelpers => (
        <>
          {questions.map((question: BuildQuestionType, index: number) => (
            <Container key={index} className="mb-5">
              <Card className="shadow">
                <CardBody>
                  <Input
                    id={`${index}-1`}
                    name={`questions[${index}].question_title`}
                    label="Titulo da questão"
                    type="text"
                  />
                  <Row>
                    <Col xl='6'>
                      <Input
                        id={`${index}-2`}
                        name={`questions[${index}].question_type`}
                        label="Tipo da questão"
                        type="options"
                        options={QuestionTypes}
                      />
                    </Col>
                    <Col xl='6'>
                      <SelectInputType
                        id={`${index}-3`}
                        name={`questions[${index}].question_answer`}
                        type={questions[index].question_type} />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => arrayHelpers.push({ ...question })} className="btn-1 ml-1" color="success">
                    Adicionar
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
