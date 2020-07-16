import React from "react";
import { Button, Col, Row } from "reactstrap";

import * as Yup from "yup";

import { useAuthUser, RegisterType } from "services";
import { Form, Input } from "components";
import { message } from "components/constants";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Nome')),
  email: Yup.string()
    .email('Email inválido')
    .required(message.required('Email')),
  profession: Yup.string()
    .min(3, 'Profissão inválida')
    .required(message.required('Profissão')),
  password: Yup.string()
    .min(6, 'Deve possuir no mínimo 3 caractéres')
    .required(message.required('Senha')),
});

export function UserForm({ user = { username: '', email: '', password: '' } }: { user?: RegisterType }) {
  const { onRegister } = useAuthUser();

  const handleSave = (params: RegisterType) => onRegister(params)

  return (
    <Form
      initialValues={user}
      validationSchema={schema}
      onSubmit={handleSave}
    >
      <Input name="username" label="Nome" placeholder="Maria ..." type="text" />
      <Input name="email" label="Email" placeholder="email@email.com" type="text" />
      <Input
        name="profession"
        label="Profissão"
        type="options"
        options={[
          { label: 'Psicopedagogos' },
          { label: 'Neuropsicopedagogos' },
          { label: 'Educador especial' },
          { label: 'Outro' },
        ]}
      />
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
            Cadastrar
          </Button>
        </Col>
        <Col xl={12}>
          <Link className="text-center btn-block" to='/login'>Já tenho cadastro</Link>
        </Col>
      </Row>
    </Form>
  );
}
