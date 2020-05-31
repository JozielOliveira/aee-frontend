import React from "react";
import { Link, useHistory } from 'react-router-dom'

import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  NavbarBrand,
  Col,
  Row
} from 'reactstrap'

export const Header = () => {
  const { push } = useHistory();
  return (
    <Navbar className="navbar-dark bg-default fixed-top" expand="lg">
      <Container>
        <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
          Educação Especial
        </NavbarBrand>
        <button className="navbar-toggler" id="navbar-default">
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar-default">
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  <img
                    alt="..."
                    src={require('assets/img/brand/argon-react.png')}
                  />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" id="navbar-default">
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="ml-lg-auto" navbar>
            <NavItem>
              <NavLink onClick={() => push("/quiz")}>
                Quiz <span className="sr-only">(current)</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => push("/create-quiz")}>
                Criar Quiz
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>Settings</DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                right
              >
                <DropdownItem
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Action
											</DropdownItem>
                <DropdownItem
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Another action
											</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Something else here
											</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  )
}
