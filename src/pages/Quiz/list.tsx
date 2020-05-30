import React from "react";
import { Container, Card, CardBody, CardFooter, Button } from "reactstrap";

import { useGetQuizzes, useDeleteQuiz } from "services";
import { useHistory } from "react-router";

export default function ListQuizPage() {
  const { push } = useHistory()
  const { loading, error, data } = useGetQuizzes();
  const [deleteQuiz, { data: deletado }] = useDeleteQuiz();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>

  if (deletado?.deleteQuiz.quiz.id)
    data.quizzes = data.quizzes.filter(quiz => quiz.id !== deletado?.deleteQuiz.quiz.id)

  return (
    <main>
      {data.quizzes.map((quiz, index) =>
        <Container key={index} className="mb-5">
          <Card className="shadow">
            <CardBody>
              <Label value={`${quiz.id} - ${quiz.title}`} />
              <Description value={quiz.description} />
            </CardBody>
            <CardFooter>
              <Button onClick={() => push(`/quiz/${quiz.id}`)} className="btn-1 ml-1" color="primary">
                Visualizar
                </Button>
              <Button onClick={() => push(`/update-quiz/${quiz.id}`)} className="btn-1 ml-1" color="info">
                Editar
                </Button>
              <Button onClick={() => deleteQuiz({ variables: { id: quiz.id } })} className="btn-1 ml-1" color="danger">
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
    <h4 className="text-uppercase font-weight-bold">{props.value}</h4>
  </div>
);

export const Description = (props: { value: string }) => (
  <p className="description">{props.value}</p>
);
