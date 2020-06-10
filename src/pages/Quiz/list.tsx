import React, { useEffect } from "react";
import { Container, Card, CardBody, CardFooter, Button } from "reactstrap";

import { useGetQuizzes, useDeleteQuiz } from "services";
import { useHistory } from "react-router";
import { useModal, useAlert, useLoader } from "components";

export default function ListQuizPage() {
  const { push } = useHistory()
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetQuizzes();
  const [deleteQuiz, { data: deletado }] = useDeleteQuiz();
  const { onOpenModal } = useModal()
  const { onAlert } = useAlert()

  const handleDelete = (id: string, title: string) => {
    onOpenModal({
      title: `Excluir ${title}`,
      description: 'Deseja realmente excluir este quiz?',
      icon: 'warning',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        onLoader(true)
        await deleteQuiz({ variables: { id } })
        onAlert(`${title} excluido com sucesso`, 'success')
        onLoader(false)
      }
    })
  }

  useEffect(() => {
    onLoader(loading)
  }, [loading, onLoader])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  if (deletado?.deleteQuiz.quiz.id)
    data.quizzes = data.quizzes.filter(quiz => quiz.id !== deletado?.deleteQuiz.quiz.id)

  return (
    <main>
      <h1 className="h1 text-lead font-weight-bold text-center mb-5">
        Testes
      </h1>
      {data.quizzes.map((quiz, index) =>
        <Container key={index} className="mb-5">
          <Card className="shadow">
            <CardBody>
              <Label value={`${quiz.id} - ${quiz.title}`} />
              <Description value={quiz.description} />
            </CardBody>
            <CardFooter>
              <Button onClick={() => push(`/teste/${quiz.id}`)} className="btn-1 ml-1" color="primary">
                Visualizar
                </Button>
              <Button onClick={() => push(`/update-teste/${quiz.id}`)} className="btn-1 ml-1" color="info">
                Editar
                </Button>
              <Button onClick={() => handleDelete(quiz.id, quiz.title)} className="btn-1 ml-1" color="danger">
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
