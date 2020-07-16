import React, { useEffect } from "react";
import { Navbar, Container, Card, CardBody, CardFooter, Button, Row, Col } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

import { useGetStudent, useGetFlow } from "services";
import { useRouter } from "hooks";
import { useLoader } from "components";


export default function StudentPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { push } = useHistory()
  const { loading, error, data } = useGetStudent(id);
  const { loading: loadingFlow, error: errorFlow, data: flow } = useGetFlow();
  const { onShowNavbar } = useRouter()

  useEffect(() => {
    onLoader(loading || loadingFlow)
    onShowNavbar(false)

    return () => onShowNavbar(true)
  }, [data, loading, loadingFlow, onLoader, onShowNavbar])

  if (error || errorFlow) return <p>Error :(</p>;
  if (!data || !flow) return null

  return (
    <main>
      <Navbar className="navbar-dark bg-default fixed-top" expand="lg">
        <Container>
          <h4 className="text-white text-uppercase font-weight-bold text-center">
            {data.student.name}
          </h4>
        </Container>
      </Navbar>
      <main>
        <h1 className="h1 text-lead font-weight-bold text-center mb-5">
          Estudantes
      </h1>
        <Container className="mb-5" >
          <Row>
            {flow.flows.map((step, index) =>
              <Col key={index} xl={index ? 6 : 12}>
                <Card className="shadow mb-5">
                  <CardBody>
                    <Row>
                      <Col>
                        <Label value={step.name} />
                        <Description value={step.description} />
                      </Col>
                      <Col xl="12" style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                        <Button onClick={() => push(`/teste/${step.quiz.id}/estudante/${id}`)} className="btn-1 ml-1" color="primary">
                          Aplicar
                        </Button>
                        <Button onClick={() => push(`/estudante/${id}/teste/${step.quiz.id}`)} className="btn-1 ml-1" color="info">
                          Visualizar
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>

                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </main>
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
