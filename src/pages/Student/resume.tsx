import React from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Resume } from "components/RenderForm/resume";
import { useGetResponseQuiz } from "services";
import { useParams } from "react-router-dom";

export default function ResumePage() {
  const { idTest = '0', idStudent = '0' } = useParams();
  const { data } = useGetResponseQuiz(idTest, idStudent);

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
