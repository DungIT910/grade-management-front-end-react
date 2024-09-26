import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LecturerNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/lecturer">Giảng viên</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/lecturer/courses">Danh sách khoá học</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default LecturerNavbar;
