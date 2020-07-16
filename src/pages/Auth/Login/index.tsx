import React from "react";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import { UserForm } from "./form";
import { AuthUser } from "services";
import { Icon } from "../icon";

export default function Register() {
  return (
    <AuthUser>
      <section className="section section-shaped section-lg">
        <Container>
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 mb-4">
                  <Icon />
                  <UserForm />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </AuthUser>
  );
}
