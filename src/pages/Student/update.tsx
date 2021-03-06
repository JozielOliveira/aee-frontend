import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useGetStudent, SaveStudent } from "services";
import { StudentForm } from "./form";
import { useLoader } from "components";
import { Container } from "reactstrap";

export default function UpdateStudentPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetStudent(id);

  useEffect(() => {
    onLoader(loading)
  }, [loading, onLoader])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  return (
    <SaveStudent>
      <div className="mb-2">_</div>
      <Container>
        <h2 className="text-uppercase font-weight-bold text-center mb-5">
          Editar estudante
        </h2>
      </Container>
      <StudentForm student={data.student} />
    </SaveStudent>
  )
}
