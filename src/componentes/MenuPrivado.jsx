import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';

function MenuPrivado() {

    const usuario = getUsuario();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/privado">CAB</NavLink>
                            {usuario &&
                            <NavDropdown title="Opções" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" exact="true" to="/privado/pedido">Pedidos</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="/privado/cliente">Clientes</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="/privado/produto">Produtos</NavLink>
                            </NavDropdown>
                            }

                            <NavLink className="nav-link active" aria-current="page" exact="true" to="agendamento">Agendamentos</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                     <Navbar.Collapse className="justify-content-end">                        
                        <NavDropdown title={usuario ? "Usuário: " + usuario.nome : "Usuário"} id="basic-nav-dropdown">
                            {usuario ?
                                <NavLink className="dropdown-item" exact="true"
                                    to="/" onClick={() => logout()}>Logout</NavLink>
                                :
                                <NavLink className="dropdown-item" exact="true"
                                    to="/login">login</NavLink>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default MenuPrivado;