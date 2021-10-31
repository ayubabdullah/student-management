import React from "react";
import { Container, Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = ({isOpenCreateModal, setIsOpenCreateModal}) => {
  
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>Student Managment</Navbar.Brand>
        </Link>
          <Button variant="outline-primary" className="px-5" onClick={() => setIsOpenCreateModal(true)}>Add</Button>
      </Container>
    </Navbar>
  );
};

export default Nav;
