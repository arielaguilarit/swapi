import React from "react";
import { Navbar, Container, Nav, NavItem } from "react-bootstrap";
import { Router, Route, Link } from "react-router-dom";

function Navegation() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            SWAPI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/*<Nav.Link href="#home">Mis Personajes</Nav.Link>*/}
            {/*<Nav.Link href="#link">Planetas</Nav.Link>*/}
            <Nav className="ml-auto">
              <NavItem>
                <Link className="nav-link" as={Link} to="/">
                  Mis Personajes
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" as={Link} to="/planetas">
                  Planetas
                </Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navegation;
