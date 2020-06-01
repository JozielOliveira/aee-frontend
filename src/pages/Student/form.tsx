import React from "react";
import { Row, Col, Button, Container, Card, CardBody, CardFooter } from "reactstrap";

import * as Yup from "yup";

import { useSaveStudent, StudentType } from "services";
import { Form, Input } from "components";
import { message } from "components/constants";
import { QuestionType } from "types";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Nome do aluno')),
});

const inputs: QuestionType[] = [{
  label: 'Nome',
  name: 'name',
  type: 'text',
}]

export function StudentForm({ student = { name: '' } }: { student?: StudentType }) {
  const { onSaveStudent } = useSaveStudent();

  const handleSave = (params: any) => {
    onSaveStudent(params)
  }

  return (
    <Form
      initialValues={student}
      validationSchema={schema}
      onSubmit={handleSave}
    >
      <Container className="mb-5">
        <Card className="shadow">
          <CardBody>
            {inputs.map((question, index) => (
              <Row key={index}>
                <Col>
                  <Input {...question} />
                </Col>
              </Row>
            ))}
          </CardBody>
          <CardFooter>
            <Button type="submit" className="btn-1 ml-1" color="success">
              Salvar
            </Button>
          </CardFooter>
        </Card>
      </Container>

    </Form>
  );
}
