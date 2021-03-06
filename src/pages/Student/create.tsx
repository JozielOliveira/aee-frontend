import React from "react";
import { SaveStudent } from "services";
import { StudentForm } from "./form";
import { Container } from "reactstrap";

export default function CrateStudentPage() {
  return (
    <SaveStudent>
      <div className="mb-2">_</div>
      <Container>
        <h2 className="text-uppercase font-weight-bold text-center mb-5">
          Novo estudante
        </h2>
      </Container>
      <StudentForm />
    </SaveStudent>
  )
}
