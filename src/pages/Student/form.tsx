import React from "react";
import { Row, Col, Button, Container, Card, CardBody, CardFooter } from "reactstrap";

import * as Yup from "yup";

import { useSaveStudent, StudentType } from "services";

import { Form, Input } from "components";
import { message } from "components/constants";
import { useHistory } from "react-router";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Nome do aluno')),
  date_birth: Yup.string()
    .required(message.required('Data de nascimento')),
  age: Yup.number()
    .required(message.required('Idade')),
  gender: Yup.string()
    .required(message.required('Genêro')),
  nationality: Yup.string()
    .required(message.required('Nacionalidade')),
  zip_code: Yup.string()
    .required(message.required('CEP')),
  state: Yup.string()
    .required(message.required('Estado')),
  city: Yup.string()
    .required(message.required('Cidade')),
  street: Yup.string()
    .required(message.required('Endereço')),
  school: Yup.string()
    .required(message.required('Escola')),
  school_grade: Yup.string()
    .required(message.required('Série')),
  teacher: Yup.string()
    .required(message.required('Professor')),
  responsible_name: Yup.string()
    .required(message.required('Nome do Responsável')),
  responsible_phone_number: Yup.string()
    .required(message.required('Telefone do Resposável')),
});


export function StudentForm({ student }: { student?: StudentType }) {
  const { onSaveStudent } = useSaveStudent();
  const { push } = useHistory()

  const handleSave = (params: StudentType) => {
    onSaveStudent(params)
    push('/estudantes')
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
            <Row  >
              <Col xl='12'>
                <Input label="Nome" name="name" type="text" />
              </Col>
              <Col xl='3'>
                <Input label="Data de Nascimento" name="date_birth" type="text" />
              </Col>
              <Col xl='2'>
                <Input label="Idade" name="age" type="number" />
              </Col>
              <Col xl='2'>
                <Input
                  label="Genêro"
                  name="gender"
                  type="options"
                  options={[{
                    label: 'Feminino'
                  }, {
                    label: 'Masculino'
                  }]}
                />
              </Col>
              <Col xl='2'>
                <Input label="Naturalidade" name="nationality" type="text" />
              </Col>
              <Col xl='3'>
                <Input label="CEP" name="zip_code" type="text" />
              </Col>
              <Col xl='2'>
                <Input label="Estado" name="state" type="text" />
              </Col>
              <Col xl='4'>
                <Input label="Cidade" name="city" type="text" />
              </Col>
              <Col xl='6'>
                <Input label="Endereço" name="street" type="text" />
              </Col>
              <Col xl='12'>
                <Input label="Escola" name="school" type="text" />
              </Col>
              <Col xl='8'>
                <Input label="Professora" name="teacher" type="text" />
              </Col>
              <Col xl='4'>
                <Input label="Série" name="school_grade" type="text" />
              </Col>
              <Col xl='8'>
                <Input label="Nome do Responsável" name="responsible_name" type="text" />
              </Col>
              <Col xl='4'>
                <Input label="Telefone do Responsável" name="responsible_phone_number" type="text" />
              </Col>
            </Row>
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
