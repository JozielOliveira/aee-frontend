import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Container, Card, CardBody, CardFooter, Button, Row, Col } from "reactstrap";

// core components
import { BuilderQuestions, Input } from "..";
import { message } from "../constants";
import { BuilderQuizProps, BuildStepType } from 'types';
import { useSaveQuiz } from "services";

const schema = Yup.object().shape({
  quiz_title: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Titulo do fomulário')),
  steps: Yup.array()
    .of(
      Yup.object().shape({
        step_title: Yup.string()
          .min(4, 'Deve possuir no mínimo 4 caractéres')
          .required(message.required('Titulo da questão')),
        position: Yup.number().required('Digite a posição da etapa'),
        questions: Yup.array()
          .of(
            Yup.object().shape({
              question_title: Yup.string()
                .min(4, 'Deve possuir no mínimo 4 caractéres')
                .required(message.required('Titulo da questão')),
              question_type: Yup.string()
                .required(message.required('Tipo da questão')),
              question_answer: Yup.string(),
              position: Yup.number().required('Digite a posição')
            })
          )
          .required('É obritório ter questões')
          .min(1, 'Deve ter no mínimo 1 questão'),
      }))
});

export const BuilderQuiz = ({ quiz }: { quiz?: BuilderQuizProps }) => {
  const initialStep: BuildStepType = {
    position: 0,
    step_title: '',
    questions: [{ position: 0, question_title: '', question_type: 'Texto', question_answer: '' }]
  }
  const initialValues: BuilderQuizProps = quiz ? { ...quiz } :
    {
      quiz_title: '',
      steps: [initialStep]
    }

  const { onSaveQuiz } = useSaveQuiz()

  return (
    <>
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSaveQuiz}
        >
          {({ values }: any) => (
            <Form>
              <Container className="mb-5">
                <Card className="shadow">
                  <CardBody>
                    <Input
                      id={`quiz_title`}
                      name={`quiz_title`}
                      label="Titulo do Fomulário"
                      type="text"
                    />
                  </CardBody>
                </Card>
              </Container>
              <FieldArray
                name="steps"
                render={arrayHelpers => (
                  <>
                    {values.steps.map((step: BuildStepType, index: string) => (
                      <Container key={index} className="mb-5">
                        <Card className="shadow">
                          <CardBody>
                            <Row>
                              <Col xl='10'>
                                <Input
                                  id={`${index}-1`}
                                  name={`steps[${index}].step_title`}
                                  label="Titulo da Etapa"
                                  type="text"
                                />
                              </Col>
                              <Col xl='2'>
                                <Input
                                  id={`${index}-2`}
                                  name={`steps[${index}].position`}
                                  label="Posição Etapa"
                                  type="number"
                                />
                              </Col>
                            </Row>
                            <BuilderQuestions step_id={index} questions={values.steps[index].questions} />
                          </CardBody>
                          <CardFooter>
                            <Button onClick={() => arrayHelpers.push({ ...initialStep, position: index + 1 })} className="btn-1 ml-1" color="success">
                              Adicionar Etapa
                            </Button>
                          </CardFooter>
                        </Card>
                      </Container>
                    ))}
                  </>
                )}
              />
              <Container className="mb-5">
                <Button color="success" type="submit">Salvar Quiz</Button>
              </Container>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}


