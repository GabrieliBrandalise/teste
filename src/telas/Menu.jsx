import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/">CAB</NavLink>
                            <NavDropdown title="Opções" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" exact="true" to="pedido">Pedidos</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="cliente">Clientes</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="produto">Produtos</NavLink>
                            </NavDropdown>
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="agendamento">Agendamentos</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Menu;