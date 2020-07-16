import React, { useEffect } from "react";
import { Container, Card, CardBody, CardFooter, Button, NavLink, Nav, Col, Row } from "reactstrap";

import { useGetUsers, useDeleteUser } from "services";
import { useHistory } from "react-router";
import { useModal, useAlert, useLoader, Fab } from "components";

export default function ListQuizPage() {
  const { push } = useHistory()
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetUsers();
  const [deleteUser, { data: deletado }] = useDeleteUser();
  const { onOpenModal } = useModal()
  const { onAlert } = useAlert()

  const handleDelete = (id: string, title: string) => {
    onOpenModal({
      title: `Excluir ${title}`,
      description: 'Deseja realmente excluir este profissional?',
      icon: 'warning',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        onLoader(true)
        await deleteUser({ variables: { id } })
        onLoader(false)
        onAlert(`${title} excluído com sucesso`, 'success')
      }
    })
  }

  useEffect(() => {
    onLoader(loading)
  }, [loading, onLoader])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  if (deletado?.deleteUser.user.id)
    data.users = data.users.filter(quiz => quiz.id !== deletado?.deleteUser.user.id)

  return (
    <main>
      <span className="mb-4">_</span>
      <h1 className="h1 text-lead font-weight-bold text-center mb-5">
        Profissionais
      </h1>
      {!data.users.length &&
        <h5 className="h5 text-muted text-center mt-8">
          Adicione um profissional
        </h5>
      }
      {data.users.map((user, index) =>
        <Container key={index} className="mb-5">
          <Card className="shadow">
            <CardBody>
              <Row>
                <Col>
                  <Label value={user.username} />
                  {/* <Description value={user.description} /> */}
                </Col>
                <Col xl="12" style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <Button onClick={() => push(`/edit-professional/${user.id}`)} className="btn-1 ml-1" color="info">
                    Editar
                  </Button>
                  <Button onClick={() => user.id && handleDelete(user.id, user.username)} className="btn-1 ml-1" color="danger">
                    Excluir
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      )}
      <Fab route='/add-professional' />
    </main >
  );
}

export const Label = (props: { value: string }) => (
  <div className="mb-3">
    <h4 className="text-lead text-uppercase font-weight-bold">{props.value}</h4>
  </div>
);

export const Description = (props: { value: string }) => (
  <p className="description">{props.value}</p>
);
