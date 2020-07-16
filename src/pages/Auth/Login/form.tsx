import React from "react";
import { Button, Row, Col } from "reactstrap";

import * as Yup from "yup";

import { useAuthUser, LoginType } from "services";
import { Form, Input } from "components";
import { message } from "components/constants";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  identifier: Yup.string()
    .email('Email inválido')
    .required(message.required('Email')),
  password: Yup.string()
    .min(6, 'Deve possuir no mínimo 6 caractéres')
    .required(message.required('Senha')),
});

export function UserForm({ user = { identifier: '', password: '' } }: { user?: LoginType }) {
  const { onLogin } = useAuthUser();

  const handleSave = (params: LoginType) => onLogin(params)

  return (
    <Form
      initialValues={user}
      validationSchema={schema}
      onSubmit={handleSave}
    >
      <Input name="identifier" label="Email" placeholder="email@email.com" type="text" />
      <Input
        name="password"
        label="Senha"
        placeholder="***********"
        type="password"
      />
      <Row className="mt-5">
        <Col xl={12} className="mb-4">
          <Button
            color="primary"
            type="submit"
            className="btn-lg btn-block"
          >
            Entrar
          </Button>
        </Col>
        <Col xl={12}>
          <Link className="text-center btn-block" to='/register'>Não sou cadastrado</Link>
        </Col>
      </Row>
    </Form>
  );
}
