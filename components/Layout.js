import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Particles from 'react-tsparticles';
import { options } from '../config/particles';

export const Layout = ({ children }) => (
  <>
    <Particles id='tsparticles' className='particle-bg' options={options} />
    <Container fluid>
      <Navbar bg='transparent' expand='xl'>
        <Navbar.Brand href='#home'>SPENCER SNYDER</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link href='#blog'>BLOG</Nav.Link>
            <Nav.Link href='#resume'>RESUME</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </Container>
  </>
);
