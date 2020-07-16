import React, { useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Resume } from "components/RenderForm/resume";
import { useGetResponseQuiz } from "services";
import { useParams } from "react-router-dom";
import { useLoader } from "components";

export default function ResumePage() {
  const { idTest = '0', idStudent = '0' } = useParams();
  const { onLoader } = useLoader()
  const { data, loading } = useGetResponseQuiz(idTest, idStudent);

  useEffect(() => {
    onLoader(loading)
  }, [loading, onLoader])

  return (
    <Container className="mb-5">
      <Card className="shadow">
        <CardBody>
          <Resume title={data?.quiz.title || ''} />
        </CardBody>
      </Card>
    </Container>
  );
};
