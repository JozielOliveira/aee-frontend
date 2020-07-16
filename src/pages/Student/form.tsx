import React from "react";
import { Row, Col, Button, Container, Card, CardBody, CardFooter } from "reactstrap";

import * as Yup from "yup";

import { Form, Input } from "components";
import { message } from "components/constants";
import { useSaveStudent, StudentType } from "services";
import { format } from "date-fns";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Nome')),
  gender: Yup.string()
    .required(message.required('Gênero')),
  date_birth: Yup.string()
    .required(message.required('Aniversário')),
  age: Yup.number()
    .required(message.required('Idade')),
  zip_code: Yup.string()
    .required(message.required('CEP')),
  nationality: Yup.string()
    .required(message.required('Nacionalidade')),
  state: Yup.string()
    .required(message.required('Estado')),
  city: Yup.string()
    .required(message.required('Cidade')),
  street: Yup.string()
    .required(message.required('Aniversário')),
  school: Yup.string()
    .required(message.required('Escola')),
  school_grade: Yup.string()
    .required(message.required('Série')),
  teacher: Yup.string()
    .required(message.required('Professora')),
  responsible_name: Yup.string()
    .required(message.required('Responsável')),
  responsible_phone_number: Yup.string()
    .required(message.required('Contato')),
});

export function StudentForm({ student = { name: '', age: 0, date_birth: '2020-01-01' } }: { student?: StudentType }) {
  const { onSaveStudent } = useSaveStudent();
  const initialValues = { ...student, date_birth: format(new Date(student.date_birth), 'dd/MM/yyyy') }

  const handleSave = (params: StudentType) => onSaveStudent({ ...params, id: student.id })

  return (
    <Form
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSave}
    >
      <Container className="mb-5">
        <Card className="shadow">
          <CardBody>
            <Row>
              <Col xl='12'>
                <Input label='Nome' name='name' type='text' />
              </Col>
              <Col xl='2'>
                <Input label='Gênero' name='gender' type='options' options={[
                  { label: 'Feminino' }, { label: 'Masculino' }
                ]} />
              </Col>
              <Col xl='2'>
                <Input label='Aniversário' name='date_birth' type='date' />
              </Col>
              <Col xl='2'>
                <Input label='Idade' name='age' type='number' />
              </Col>
              <Col xl='2'>
                <Input label='CEP' name='zip_code' type='text' />
              </Col>
              <Col xl='4'>
                <Input label='Nacionalidade' name='nationality' type='text' />
              </Col>
              <Col xl='5'>
                <Input label='Estado' name='state' type='text' />
              </Col>
              <Col xl='7'>
                <Input label='Cidade' name='city' type='text' />
              </Col>
              <Col xl='12'>
                <Input label='Endereço' name='street' type='text' />
              </Col>
              <Col xl='8'>
                <Input label='Escola' name='school' type='text' />
              </Col>
              <Col xl='4'>
                <Input label='Série' name='school_grade' type='text' />
              </Col>
              <Col xl='12'>
                <Input label='Professora' name='teacher' type='text' />
              </Col>
              <Col xl='8'>
                <Input label='Nome do Responsável' name='responsible_name' type='text' />
              </Col>
              <Col xl='4'>
                <Input label='Contato do Responsável' name='responsible_phone_number' type='text' />
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
