import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Card, CardBody, Button } from "reactstrap";

// core components
import { BuilderQuestions, Input } from "..";
import { message } from "../constants";
import { BuilderQuizProps } from 'types';

export const BuilderQuiz = ({ onSubmit, initialValues }: { onSubmit(params: BuilderQuizProps): void, initialValues: BuilderQuizProps }) => {
  const schema = Yup.object().shape({
    quiz_title: Yup.string()
      .min(3, 'Deve possuir no mínimo 3 caractéres')
      .required(message.required('Titulo do fomulário')),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question_title: Yup.string()
            .min(4, 'Deve possuir no mínimo 4 caractéres')
            .required(message.required('Titulo da questão')),
          question_type: Yup.string()
            .required(message.required('Tipo da questão')),
          question_answer: Yup.string()
        })
      )
      .required('É obritório ter questões')
      .min(1, 'Deve ter no mínimo 1 questão'),
  });

  return (
    <>
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
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
              <BuilderQuestions questions={values.questions} />
              <Button type="submit">Enviar</Button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}


