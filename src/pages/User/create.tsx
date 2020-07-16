import React from "react";

import { Container } from "reactstrap";
import { UserForm } from "./form";
import { SaveUser } from "services";

export default function Register() {
  return (
    <SaveUser>
      <div className="mb-2">_</div>
      <Container>
        <h2 className="text-uppercase font-weight-bold text-center mb-5">
          Novo profissional
        </h2>
      </Container>
      <UserForm />
    </SaveUser>
  );
}
