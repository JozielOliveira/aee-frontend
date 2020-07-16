import React from "react";
import { Row, Col, Button, Container, Card, CardBody, CardFooter } from "reactstrap";

import * as Yup from "yup";

import { Form, Input } from "components";
import { message } from "components/constants";
import { UserType, useSaveUser } from "services";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Nome')),
  email: Yup.string().email()
    .required(message.required('Email')),
  password: Yup.string()
    .min(6, 'Deve possuir no mínimo 6 caractéres')
    .required(message.required('Senha')),
  role: Yup.object().shape({
    name: Yup.string().required(message.required('Nível de acesso')),
  })
});

const schemaUpdate = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Nome')),
  email: Yup.string().email()
    .required(message.required('Email')),
  role: Yup.object().shape({
    name: Yup.string().required(message.required('Nível de acesso')),
  })
});

export function UserForm({ user = { username: '', email: '', password: '' } }: { user?: UserType }) {
  const { onSaveUser } = useSaveUser();

  const handleSave = async (params: UserType) => {
    if (user.id) params.id = user.id
    await onSaveUser(params)
  }

  return (
    <Form
      initialValues={user}
      validationSchema={user.username ? schemaUpdate : schema}
      onSubmit={handleSave}
    >
      <Container className="mb-5">
        <Card className="shadow">
          <CardBody>
            <Row>
              <Col xl='6'>
                <Input label='Nome' name='username' type='text' />
              </Col>
              <Col xl='6'>
                <Input label='Email' name='email' type='text' />
              </Col>
              {!user.username &&
                <Col xl='12'>
                  <Input label='Senha' name='password' type='password' />
                </Col>
              }
              <Col xl='6'>
                <Input
                  label='Profissão'
                  name="profession"
                  type="options"
                  options={[
                    { label: 'Psicopedagogos' },
                    { label: 'Neuropsicopedagogos' },
                    { label: 'Educador especial' },
                    { label: 'Outro' },
                  ]}
                />
              </Col>
              <Col xl='6'>
                <Input label='Nível de acesso' name='role.name' type='options' options={[
                  { label: 'Administrador' }, { label: 'Profissional' }
                ]} />
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
