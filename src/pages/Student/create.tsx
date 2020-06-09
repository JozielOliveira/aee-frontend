import React from "react";
import { SaveStudent } from "services";
import { StudentForm } from "./form";
import { Title } from "components";

export default function CrateStudentPage() {
  return (
    <SaveStudent>
      <Title value="Criar Estudantes" />
      <StudentForm />
    </SaveStudent>
  )
}
