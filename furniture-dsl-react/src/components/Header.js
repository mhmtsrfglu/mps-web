import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import CanonLogo from '../assets/canon.png'

function Header() {
    return (
        <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={CanonLogo}
              height="30"
              className="d-inline-block align-top"
              alt="Canon logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
}

export default Header
