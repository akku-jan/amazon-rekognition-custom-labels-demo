import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

const Header = ({currentPage, onHelp, loadProjectList}) => (
  <Navbar
    style={{backgroundColor: "#ffffff", marginBottom: "20px"}}
    variant="dark"
  >
    <Container>
      <Navbar.Brand>
        <div className="awslogo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          {currentPage !== "projects" && (
            <Button onClick={loadProjectList} variant="akkurent">
              Projects
            </Button>
          )}
          {currentPage !== "help" && (
            <Button onClick={onHelp} variant="light">
              Help
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
