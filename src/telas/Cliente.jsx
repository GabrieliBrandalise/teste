import { useState, useEffect } from 'react';
import ClienteContext from './context/ClienteContext';
import {
    getClientesAPI,
    deleteClienteAPI, adicionarClienteAPI, atualizarClienteAPI
} from '../services/ClienteServico';
import { Button, Table, Modal, Form } from 'react-bootstrap';

function Cliente() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaClientes, setListaClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [clienteAtual, setClienteAtual] = useState({
        nome: "", cpf_cnpj: "", telefone: "", endereco: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const recuperarClientes = async () => {
        const clientes = await getClientesAPI();
        setListaClientes(clientes);
    };

    const removerCliente = async id => {
        if (window.confirm('Deseja remover este cliente?')) {
            const retornoAPI = await deleteClienteAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarClientes();
        }
    };

    const adicionarCliente = async cliente => {
        const retornoAPI = await adicionarClienteAPI(cliente);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarClientes();
        setShowModal(false);
    };

    const atualizarCliente = async (cliente) => {
        const retornoAPI = await atualizarClienteAPI(cliente);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarClientes();
        setShowModal(false);
    };

    const openModal = (cliente = {
        nome: "", cpf_cnpj: "", telefone: "", endereco: ""
    }) => {
        setClienteAtual(cliente);
        setIsEditing(cliente.id ? true : false);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await atualizarCliente(clienteAtual);
        } else {
            await adicionarCliente(clienteAtual);
        }
    };

    useEffect(() => {
        recuperarClientes();
    }, []);

    return (
        <ClienteContext.Provider value={{
            alerta, setAlerta,
            listaClientes,
            recuperarClientes,
            removerCliente,
            adicionarCliente,
            atualizarCliente
        }}>
            <div className="container mt-4">

                {alerta.message && (
                    <div className={`alert alert-${alerta.status}`} role="alert">
                        {alerta.message}
                    </div>
                )}

                <Button variant="primary" className="mb-3" onClick={() => openModal()}>Adicionar Cliente</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF/CNPJ</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaClientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cpf_cnpj}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.endereco}</td>
                                <td>
                                    <Button variant="warning" onClick={() => openModal(cliente)}>Editar</Button>
                                    <Button variant="danger" className="ml-2" onClick={() => removerCliente(cliente.id)}>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Editar Cliente' : 'Adicionar Cliente'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do cliente"
                                    value={clienteAtual.nome}
                                    onChange={(e) => setClienteAtual({ ...clienteAtual, nome: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="cpf_cnpj">
                                <Form.Label>CPF/CNPJ</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="CPF ou CNPJ"
                                    value={clienteAtual.cpf_cnpj}
                                    onChange={(e) => setClienteAtual({ ...clienteAtual, cpf_cnpj: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Telefone"
                                    value={clienteAtual.telefone}
                                    onChange={(e) => setClienteAtual({ ...clienteAtual, telefone: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="endereco">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Endereço"
                                    value={clienteAtual.endereco}
                                    onChange={(e) => setClienteAtual({ ...clienteAtual, endereco: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Atualizar Cliente' : 'Criar Cliente'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </ClienteContext.Provider>
    );
}

export default Cliente;
