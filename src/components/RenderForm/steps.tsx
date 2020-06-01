import React from "react";
import { Row, Col, Button } from "reactstrap";

import { Form, Input } from "components";

import { getInitialValue, getValidationSchema } from "../utils";
import { QuestionInputService, QuestionType } from "types";

type StepsProps = {
  id: string;
  title: string;
  questions: QuestionInputService[];
  onSubmit: (id: string, values?: any) => Promise<any>;
};

export const Steps = ({ id, title, questions, onSubmit }: StepsProps) => {
  const questionsNormalize: QuestionType[] = questions.map(question => ({
    ...question,
    defaultValue: question.defaultValue && JSON.parse(question.defaultValue),
    options: question.options && JSON.parse(question.options)
  }))

  return (
    <Form
      initialValues={getInitialValue(questionsNormalize)}
      validationSchema={getValidationSchema(questionsNormalize)}
      onSubmit={(params: any) => onSubmit(id, params)}
    >
      <h3 className="h3 text-muted font-weight-bold text-center">
        {title}
      </h3>
      {questionsNormalize.map((question, index) => (
        <Row key={index}>
          <Col>
            <Input {...question} />
          </Col>
        </Row>
      ))}
      <Button type="submit" className="btn-1 ml-1" color="success">
        Continuar
      </Button>
    </Form>
  );
};
