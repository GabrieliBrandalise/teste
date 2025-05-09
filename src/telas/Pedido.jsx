import { useState, useEffect } from 'react';
import PedidoContext from './context/PedidoContext';
import {
    getPedidosAPI, deletePedidoAPI, adicionarPedidoAPI, atualizarPedidoAPI
} from '../services/PedidoServico';
import { Button, Table, Modal, Form } from 'react-bootstrap'; 

function Pedido() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaPedidos, setListaPedidos] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [pedidoAtual, setPedidoAtual] = useState({
        cliente_id: "", cliente_nome: "", cliente_telefone: "", data_pedido: "", status: ""
    }); 
    const [isEditing, setIsEditing] = useState(false); 

    const recuperarPedidos = async () => {
        const pedidos = await getPedidosAPI(); 
        console.log(pedidos);
        setListaPedidos(pedidos);
    };

    const removerPedido = async id => {
        if (window.confirm('Deseja remover este pedido?')) {
            let retornoAPI = await deletePedidoAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarPedidos();
        }
    };

    const criarPedido = async pedido => {
        const retornoAPI = await adicionarPedidoAPI(pedido);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarPedidos();
        setShowModal(false); 
    };

    const atualizarPedido = async (pedido) => {
        const retornoAPI = await atualizarPedidoAPI(pedido);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarPedidos();
        setShowModal(false); 
    };

    const openModal = (pedido = {
        cliente_id: "", cliente_nome: "", cliente_telefone: "", data_pedido: "", status: ""
    }) => {
        setPedidoAtual(pedido);
        setIsEditing(pedido.id ? true : false); 
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await atualizarPedido(pedidoAtual);  // Passa o objeto completo
        } else {
            await criarPedido(pedidoAtual);
        }
    };

    useEffect(() => {
        recuperarPedidos();
    }, []);

    return (
        <PedidoContext.Provider value={{
            alerta, setAlerta,
            listaPedidos,
            recuperarPedidos,
            removerPedido,
            criarPedido,
            atualizarPedido
        }}>
            <div className="container mt-4">
                {alerta.message && (
                    <div className={`alert alert-${alerta.status}`} role="alert">
                        {alerta.message}
                    </div>
                )}

                <Button variant="primary" className="mb-3" onClick={() => openModal()}>Adicionar Pedido</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Telefone</th>
                            <th>Data do Pedido</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaPedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{pedido.cliente_nome}</td>
                                <td>{pedido.cliente_telefone}</td>
                                <td>{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                                <td>{pedido.status}</td>
                                <td>
                                    <Button variant="warning" onClick={() => openModal(pedido)}>Editar</Button>
                                    <Button variant="danger" className="ml-2" onClick={() => removerPedido(pedido.id)}>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Editar Pedido' : 'Adicionar Pedido'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="cliente_id">
                                <Form.Label>ID do Cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ID do cliente"
                                    value={pedidoAtual.cliente_id}
                                    onChange={(e) => setPedidoAtual({ ...pedidoAtual, cliente_id: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="cliente_nome">
                                <Form.Label>Nome do Cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do cliente"
                                    value={pedidoAtual.cliente_nome}
                                    onChange={(e) => setPedidoAtual({ ...pedidoAtual, cliente_nome: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="cliente_telefone">
                                <Form.Label>Telefone do Cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Telefone do cliente"
                                    value={pedidoAtual.cliente_telefone}
                                    onChange={(e) => setPedidoAtual({ ...pedidoAtual, cliente_telefone: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="data_pedido">
                                <Form.Label>Data do Pedido</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={pedidoAtual.data_pedido}
                                    onChange={(e) => setPedidoAtual({ ...pedidoAtual, data_pedido: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Status do pedido"
                                    value={pedidoAtual.status}
                                    onChange={(e) => setPedidoAtual({ ...pedidoAtual, status: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Atualizar Pedido' : 'Criar Pedido'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </PedidoContext.Provider>
    );
}

export default Pedido;
