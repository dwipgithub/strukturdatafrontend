
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar className="navbar fixed-top navbar-expand-lg" style={{ backgroundSize: "0", backgroundColor: "#E1E6EA" }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/beranda">
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/beranda">Beranda</Nav.Link>
                        <NavDropdown title="Ref" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/agama">
                                Agama
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/provinsi">
                                Provinsi
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/penduduk">
                                Penduduk
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar