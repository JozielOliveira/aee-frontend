import React, { useEffect } from "react";
import { Container, Card, CardBody, CardFooter, Button, Col, Row } from "reactstrap";

import { useGetStudents, useDeleteStudent } from "services";
import { useHistory } from "react-router";
import { useModal, useAlert, useLoader, Fab } from "components";
import { useAdmin } from "hooks";

export default function ListQuizPage() {
  const { push } = useHistory()
  const { onLoader } = useLoader();
  const { user } = useAdmin();
  const { loading, error, data } = useGetStudents(user?.id || '');
  const [deleteStudent, { data: deletado }] = useDeleteStudent();
  const { onOpenModal } = useModal()
  const { onAlert } = useAlert()

  const handleDelete = (id: string, title: string) => {
    onOpenModal({
      title: `Excluir ${title}`,
      description: 'Deseja realmente excluir este estudente?',
      icon: 'warning',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        onLoader(true)
        await deleteStudent({ variables: { id } })
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

  if (deletado?.deleteStudent.student.id)
    data.students = data.students.filter(quiz => quiz.id !== deletado?.deleteStudent.student.id)

  return (
    <main>
      <span className="mb-4">_</span>
      <h1 className="h1 text-lead font-weight-bold text-center mb-5">
        Estudantes
      </h1>
      {!data.students.length &&
        <h5 className="h5 text-muted text-center mt-8">
          Adicione um estudante
        </h5>
      }
      {data.students.map((student, index) =>
        <Container key={index} className="mb-5">
          <Card className="shadow">
            <CardBody>
              <Row>
                <Col >
                  <Label value={student.name} />
                  {/* <Description value={student.description} /> */}
                </Col>
                <Col xl="12" style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <Button onClick={() => push(`/estudante/${student.id}`)} className="btn-1 ml-1" color="primary">
                    Atender
                  </Button>
                  <Button onClick={() => push(`/edit-estudante/${student.id}`)} className="btn-1 ml-1" color="info">
                    Editar
                  </Button>
                  <Button onClick={() => student.id && handleDelete(student.id, student.name)} className="btn-1 ml-1" color="danger">
                    Excluir
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      )}
      <Fab route='/add-estudante' />
    </main>
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
