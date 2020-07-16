import React, { useEffect } from "react";
import { Container, Card, CardBody, CardFooter, Button, Col, Row } from "reactstrap";

import { useGetQuizzes, useDeleteQuiz } from "services";
import { useHistory } from "react-router";
import { useModal, useAlert, useLoader, Fab } from "components";
import { useAdmin } from "hooks";

export default function ListQuizPage() {
  const { push } = useHistory()
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetQuizzes();
  const [deleteQuiz, { data: deletado }] = useDeleteQuiz();
  const { onOpenModal } = useModal()
  const { onAlert } = useAlert()
  const { isAdmin } = useAdmin()

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
        onAlert(`${title} excluído com sucesso`, 'success')
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
      <span className="mb-4">_</span>
      <h1 className="h1 text-lead font-weight-bold text-center mb-5">
        Testes
      </h1>
      {!data.quizzes.length &&
        <h5 className="h5 text-muted text-center mt-8">
          Adicione um teste
        </h5>
      }
      {data.quizzes.map((quiz, index) =>
        <Container key={index} className="mb-5">
          <Card className="shadow">
            <CardBody>
              <Row>
                <Col xl="6">
                  <Label value={quiz.title} />
                  <Description value={quiz.description} />
                </Col>
                <Col xl="12" style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <Button onClick={() => push(`/teste/${quiz.id}`)} className="btn-1 ml-1" color="primary">
                    Visualizar
                  </Button>
                  {isAdmin &&
                    <>
                      <Button onClick={() => push(`/edit-teste/${quiz.id}`)} className="btn-1 ml-1" color="info">
                        Editar
                      </Button>
                      <Button onClick={() => handleDelete(quiz.id, quiz.title)} className="btn-1 ml-1" color="danger">
                        Excluir
                      </Button>
                    </>
                  }
                </Col>

              </Row>
            </CardBody>
          </Card>
        </Container>
      )}
      <Fab route='/add-teste' />
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
