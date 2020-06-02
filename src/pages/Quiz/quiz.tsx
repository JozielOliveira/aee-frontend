import React, { useEffect } from "react";
import { Navbar, Container } from 'reactstrap'
import { useParams } from "react-router-dom";

import { RenderForm, useLoader } from "components";
import { useGetQuiz } from "services";
import { useRouter } from "hooks";

export default function QuizPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetQuiz(id);
  const { onShowNavbar } = useRouter()

  useEffect(() => {
    onShowNavbar(false)
    onLoader(loading)

    return () => onShowNavbar(true)
  }, [data])

  if (error) return <p>Error :(</p>;
  if (!data) return null


  return (
    <main>
      <Navbar className="navbar-dark bg-default fixed-top" expand="lg">
        <Container>
          <h4 className="text-white text-uppercase font-weight-bold text-center">
            {data.quiz.title}
          </h4>
        </Container>
      </Navbar>
      <Container className='mb-8'>
      </Container>
      <RenderForm quiz={data.quiz} />
    </main>
  );
}
