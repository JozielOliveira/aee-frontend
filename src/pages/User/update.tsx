import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useGetUser, SaveUser } from "services";
import { UserForm } from "./form";
import { useLoader } from "components";
import { Container } from "reactstrap";

export default function UpdateStudentPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetUser(id);

  useEffect(() => {
    onLoader(loading)
  }, [loading, onLoader])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  return (
    <SaveUser>
      <div className="mb-2">_</div>
      <Container>
        <h2 className="text-uppercase font-weight-bold text-center mb-5">
          Editar profissional
        </h2>
      </Container>
      <UserForm
        user={{
          ...data.user,
          role: typeof data.user.role !== 'string' && data.user.role?.name && data.user.role?.name === 'Authenticated'
            ? { name: 'Administrador' }
            : { name: 'Profissional' }
        }}
      />
    </SaveUser>
  )
}
