import { useState, useEffect } from 'react';
import AgendamentoContext from './context/AgendamentoContext';
import {
    getAgendamentosAPI, deleteAgendamentoAPI, adicionarAgendamentoAPI, atualizarAgendamentoAPI
} from '../services/AgendamentoServico'; 
import { Button, Table, Modal, Form } from 'react-bootstrap';
import WithAuth from '../seguranca/WithAuth';
import { useNavigate } from "react-router-dom";

function Agendamento() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaAgendamentos, setListaAgendamentos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [agendamentoAtual, setAgendamentoAtual] = useState({
        pedido_id: "", data_aplicacao: "", local_aplicacao: "", status: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    let navigate = useNavigate();

    const recuperarAgendamentos = async () => {
       try{
        const agendamentos = await getAgendamentosAPI();
        console.log(agendamentos);
        setListaAgendamentos(agendamentos);
       }catch(eer){
         navigate("/login", { replace: true });
       }    
    };

    const removerAgendamento = async id => {
        try{
        if (window.confirm('Deseja remover este agendamento?')) {
            let retornoAPI = await deleteAgendamentoAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarAgendamentos();
        }
    }catch(eer){
         navigate("/login", { replace: true });
    }
    };

    const criarAgendamento = async agendamento => {
        try{
        const retornoAPI = await adicionarAgendamentoAPI(agendamento);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarAgendamentos();
        setShowModal(false);
        } catch(eer){
             navigate("/login", { replace: true });
        }
    };

    const atualizarAgendamento = async (agendamento) => {
        try{
        const retornoAPI = await atualizarAgendamentoAPI(agendamento);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarAgendamentos();
        setShowModal(false);
        } catch(eer){
             navigate("/login", { replace: true });
        }
    };

    const openModal = (agendamento = {
        pedido_id: "", data_aplicacao: "", local_aplicacao: "", status: ""
    }) => {
        setAgendamentoAtual(agendamento);
        setIsEditing(agendamento.id ? true : false);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await atualizarAgendamento(agendamentoAtual);
        } else {
            await criarAgendamento(agendamentoAtual);
        }
    };

    useEffect(() => {
        recuperarAgendamentos();
    }, []);

    return (
        <AgendamentoContext.Provider value={{
            alerta, setAlerta,
            listaAgendamentos,
            recuperarAgendamentos,
            removerAgendamento,
            criarAgendamento,
            atualizarAgendamento
        }}>
            <div className="container mt-4">
                {alerta.message && (
                    <div className={`alert alert-${alerta.status}`} role="alert">
                        {alerta.message}
                    </div>
                )}

                <Button variant="primary" className="mb-3" onClick={() => openModal()}>Adicionar Agendamento</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pedido ID</th>
                            <th>Data da Aplicação</th>
                            <th>Local da Aplicação</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaAgendamentos.map(agendamento => (
                            <tr key={agendamento.id}>
                                <td>{agendamento.id}</td>
                                <td>{agendamento.pedido_id}</td>
                                <td>{new Date(agendamento.data_aplicacao).toLocaleDateString()}</td>
                                <td>{agendamento.local_aplicacao}</td>
                                <td>{agendamento.status}</td>
                                <td>
                                    <Button variant="warning" onClick={() => openModal(agendamento)}>Editar</Button>
                                    <Button variant="danger" className="ml-2" onClick={() => removerAgendamento(agendamento.id)}>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Editar Agendamento' : 'Adicionar Agendamento'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="pedido_id">
                                <Form.Label>ID do Pedido</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ID do pedido"
                                    value={agendamentoAtual.pedido_id}
                                    onChange={(e) => setAgendamentoAtual({ ...agendamentoAtual, pedido_id: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="data_aplicacao">
                                <Form.Label>Data da Aplicação</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={agendamentoAtual.data_aplicacao}
                                    onChange={(e) => setAgendamentoAtual({ ...agendamentoAtual, data_aplicacao: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="local_aplicacao">
                                <Form.Label>Local da Aplicação</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Local da aplicação"
                                    value={agendamentoAtual.local_aplicacao}
                                    onChange={(e) => setAgendamentoAtual({ ...agendamentoAtual, local_aplicacao: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Status do agendamento"
                                    value={agendamentoAtual.status}
                                    onChange={(e) => setAgendamentoAtual({ ...agendamentoAtual, status: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Atualizar Agendamento' : 'Criar Agendamento'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </AgendamentoContext.Provider>
    );
}

export default WithAuth(Agendamento);
