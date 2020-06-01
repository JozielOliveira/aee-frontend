import React, { useEffect } from "react";
import { Container, Card, CardBody, CardFooter, Button } from "reactstrap";

import { useGetStudents, useDeleteStudent } from "services";
import { useHistory } from "react-router";
import { useModal, useAlert, useLoader } from "components";

export default function ListQuizPage() {
  const { push } = useHistory()
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetStudents();
  const [deleteStudent, { data: deletado }] = useDeleteStudent();
  const { onOpenModal } = useModal()
  const { onAlert } = useAlert()

  const handleDelete = (id: string, title: string) => {
    onLoader(true)
    onOpenModal({
      title: `Excluir ${title}`,
      description: 'Deseja realmente excluir este estudente?',
      icon: 'warning',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        await deleteStudent({ variables: { id } })
        onLoader(false)
        onAlert(`${title} excluido com sucesso`, 'success')
      }
    })
  }

  useEffect(() => {
    onLoader(loading)
  }, [loading])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  if (deletado?.deleteStudent.student.id)
    data.students = data.students.filter(quiz => quiz.id !== deletado?.deleteStudent.student.id)

  return (
    <main>
      <h1 className="h1 text-lead font-weight-bold text-center mb-5">
        Estudantes
      </h1>
      {data.students.map((student, index) =>
        <Container key={index} className="mb-5">
          <Card className="shadow">
            <CardBody>
              <Label value={`${student.id} - ${student.name}`} />
              {/* <Description value={student.description} /> */}
            </CardBody>
            <CardFooter>
              <Button onClick={() => push(`/estudante/${student.id}`)} className="btn-1 ml-1" color="primary">
                Visualizar
                </Button>
              <Button onClick={() => push(`/update-estudante/${student.id}`)} className="btn-1 ml-1" color="info">
                Editar
                </Button>
              <Button onClick={() => student.id && handleDelete(student.id, student.name)} className="btn-1 ml-1" color="danger">
                Excluir
                </Button>
            </CardFooter>
          </Card>
        </Container>
      )}
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
