import React from "react";
import { Link, useHistory } from 'react-router-dom'

import {
  UncontrolledCollapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  NavbarBrand,
  Col,
  Row
} from 'reactstrap'
import { useRouter, useAdmin } from "hooks";
import Icon from '../../assets/img/brand/logo_white.png'
import './styles.css'

export const Header = () => {
  const { push } = useHistory();
  const { routes, brand, showNavbar } = useRouter();
  const { logged, isAdmin } = useAdmin()

  const handleNavigate = (params: { path: string, name: string }) => {
    document.title = params.name
    push(params.path)
  }

  if (showNavbar && logged)
    return (
      <>
        <Navbar className="navbar-dark bg-default fixed-top" expand="lg">
          <Container>
            <NavbarBrand onClick={e => e.preventDefault()}>
              <img src={Icon}></img>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-default">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-default">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <h5>
                        {brand}
                      </h5>
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
                {routes.filter(route => isAdmin ? route.showItem : !route.isAdmin && route.showItem).map((route, index) => (
                  <NavItem key={index} >
                    <NavLink onClick={() => handleNavigate(route)}>
                      {route.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
        <div style={{ marginTop: 100 }}></div>
      </>
    )
  else
    return null
}
