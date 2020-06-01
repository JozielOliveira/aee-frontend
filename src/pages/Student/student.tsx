import React, { useEffect } from "react";
import { Navbar, Container, Card, CardBody, CardFooter, Button, Row, Col } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

import { useGetStudent } from "services";
import { useRouter } from "hooks";
import { useLoader } from "components";

const flow = [
  {
    id: 1,
    title: 'ANAMNESE',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 2,
    title: 'CONSCIENCIA FONOLOGICA',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 3,
    title: 'CONHECIMENTO CÓDIGO ESCRITO',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 4,
    title: 'ESCRITA',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 5,
    title: 'LEITURA',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 6,
    title: 'NOÇÃO ESPAÇO-TEMPORAL',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 7,
    title: 'CONSCIENCIA FONOLOGICA',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 8,
    title: 'PERCEPÇÕES',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 9,
    title: 'RACIOCINIO LOGICO MATEMATICO',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 10,
    title: 'COORDENAÇÃO MOTORA',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 11,
    title: 'MEMÓRIA',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 12,
    title: 'CRIATIVIDADE/ IMAGINAÇÃO',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 13,
    title: 'OUTRAS OBSERVAÇÕES',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  },
  {
    id: 14,
    title: 'COMPORTAMENTO/ AFETIVO/ EMOCIONAL',
    description: 'É um recurso caracterizado normalmente de entrevistas sobre a história de vida do paciente/cliente (que podem incluir desenvolvimento de forma geral, histórico de doenças, rotina, dinâmica da família, trabalho, etc).'
  }
]

export default function StudentPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { push } = useHistory()
  const { loading, error, data } = useGetStudent(id);
  const { onShowNavbar } = useRouter()

  useEffect(() => {
    onLoader(loading)
    onShowNavbar(false)

    return () => onShowNavbar(true)
  }, [data, loading])


  if (error) return <p>Error :(</p>;
  if (!data) return null

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
            {flow.map((step, index) =>
              <Col key={index} xl={index ? 6 : 12}>
                <Card className="shadow mb-5">
                  <CardBody>
                    <Label value={step.title} />
                    <Description value={step.description} />
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => push(`/estudante/${step.id}`)} className="btn-1 ml-1" color="primary">
                      Visualizar
                  </Button>
                    <Button onClick={() => push(`/estudante/${step.id}`)} className="btn-1 ml-1" color="info">
                      Editar
                  </Button>
                  </CardFooter>
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
