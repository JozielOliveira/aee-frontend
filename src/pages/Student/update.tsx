import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useGetStudent, SaveStudent } from "services";
import { StudentForm } from "./form";
import { useLoader } from "components";

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
      <StudentForm student={data.student} />
    </SaveStudent>
  )
}
