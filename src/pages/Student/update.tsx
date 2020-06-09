import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useGetStudent, SaveStudent } from "services";
import { StudentForm } from "./form";
import { useLoader, Title } from "components";

export default function UpdateStudentPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetStudent(id);

  useEffect(() => {
    onLoader(loading)
  }, [loading])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  return (
    <SaveStudent>
      <Title value="Atualizar Estudante" />
      <StudentForm student={data.student} />
    </SaveStudent>
  )
}
