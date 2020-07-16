import React, { useEffect } from "react";
import * as Yup from "yup";
import { useForm, useFieldArray, FormContext } from "react-hook-form";

import { Container, Card, CardBody, Button, Row, Col } from "reactstrap";

import { BuilderQuestions } from "..";
import { message } from "../constants";
import { BuilderQuizProps, BuildStepType } from 'types';
import { useSaveQuiz } from "services";

import { Input } from "components";
import { handleNewValues } from "./utils";
import { useHistory } from "react-router";

const schema = Yup.object().shape({
  quiz_title: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Titulo do fomulário')),
  quiz_description: Yup.string(),
  steps: Yup.array()
    .of(
      Yup.object().shape({
        step_title: Yup.string()
          .min(4, 'Deve possuir no mínimo 4 caractéres')
          .required(message.required('Titulo da questão')),
        position: Yup.number().required('Digite a posição da etapa'),
        description: Yup.string(),
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

const initialStep: BuildStepType = {
  position: 0,
  step_title: '',
  questions: [{ position: 0, question_title: '', question_type: 'Texto', question_answer: '' }]
}

export const BuilderQuiz = ({ quiz }: { quiz?: BuilderQuizProps }) => {
  const { push } = useHistory();
  const initialValues: BuilderQuizProps = quiz ? { ...quiz } :
    {
      quiz_title: '', quiz_description: '', steps: [{
        step_title: '',
        position: 0,
        questions: [{
          position: 0,
          question_title: '',
          question_type: 'Texto',
          question_answer: ''
        }]
      }]
    }
  const methods = useForm({
    validationSchema: schema,
    defaultValues: initialValues
  })
  const { fields, append } = useFieldArray({ control: methods.control, name: "steps" });

  useEffect(() => {
    if (quiz) {
      methods.register({ name: 'id', value: quiz.id })
      quiz.steps.forEach((step, index_step) => {
        methods.register({ name: `steps[${index_step}].id`, value: step.id })
        step.questions.forEach((question, index_question) => {
          methods.register({ name: `steps[${index_step}].questions[${index_question}].id`, value: question.id })
        })
      })
    }
  }, [quiz, methods])

  const handleAddStep = () => {
    append({ ...initialStep, position: fields.length + 1 })
  };

  const { onSaveQuiz } = useSaveQuiz()

  const handleSubmit = (data: any) => {
    if (quiz)
      onSaveQuiz(handleNewValues(quiz, data))
    else
      onSaveQuiz(data)

    push('/testes')
  }

  return (
    <>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Container className="mb-5">
            <Card className="shadow">
              <CardBody>
                <Input
                  label="Titulo do Fomulário"
                  id='quiz_title'
                  name='quiz_title'
                  type="text"
                />
                <Input
                  label="Descrição da Formulário"
                  id='quiz_description'
                  name='quiz_description'
                  type="text"
                />
              </CardBody>
            </Card>
          </Container>
          {fields.map((step: any, index: number) => (
            <Container key={index} className="mb-5">
              <Card className="shadow mb-5">
                <CardBody>
                  <Row>
                    <Col xl='10'>
                      <Input
                        label="Titulo da Etapa"
                        id={`${index}-1`}
                        name={`steps[${index}].step_title`}
                        type="text"
                      />
                    </Col>
                    <Col xl='2'>
                      <Input
                        label="Posição Etapa"
                        id={`${index}-2`}
                        name={`steps[${index}].position`}
                        type="number"
                      />
                    </Col>
                    <Col xl='12'>
                      <Input
                        label="Descrição da Etapa"
                        id={`${index}-2`}
                        name={`steps[${index}].step_description`}
                        type="text"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <BuilderQuestions step_id={index} />
            </Container>
          ))}

          <Container className="mb-5">
            <Button onClick={handleAddStep} className="btn-1 ml-1" color="info">
              Adicionar Etapa
            </Button>
            <Button color="success" type="submit">Salvar Quiz</Button>
          </Container>
        </form>
      </FormContext>
    </>
  );
}
