import React from 'react'
import { Container, Card, CardBody } from "reactstrap"

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import Hero from "../views/IndexSections/Hero.js";
import { Form } from "../components/RenderForm/form";

export default function BuildForm() {
  return (
    <>
      <DemoNavbar />
      <main>
        <Hero />
        <Form
          initialValues={null}
          onSubmit={(params: any) => console.log(params)}
        >
          <Container className="mb-5">
            
            <Card className="shadow">
              <CardBody>
                
              </CardBody>
            </Card>
          </Container>

        </Form>
      </main>
    </>
  )
}
