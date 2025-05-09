import { useState, useEffect } from 'react';
import ProdutoContext from './context/ProdutoContext';
import {
    getProdutosAPI,
    deleteProdutoAPI, adicionarProdutoAPI, atualizarProdutoAPI
} from '../services/ProdutoServico';
import { Button, Table, Modal, Form } from 'react-bootstrap';

function Produto() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaProdutos, setListaProdutos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState({
        nome: "", tipo: "", preco: "", estoque: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const recuperarProdutos = async () => {
        const produtos = await getProdutosAPI();
        setListaProdutos(produtos);
    };

    const removerProduto = async id => {
        if (window.confirm('Deseja remover este produto?')) {
            let retornoAPI = await deleteProdutoAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarProdutos();
        }
    };

    const criarProduto = async produto => {
        const retornoAPI = await adicionarProdutoAPI(produto);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarProdutos();
        setShowModal(false);
    };

    const atualizarProduto = async (produto) => {
        const retornoAPI = await atualizarProdutoAPI(produto);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarProdutos();
        setShowModal(false);
    };

    const openModal = (produto = {
        nome: "", tipo: "", preco: "", estoque: ""
    }) => {
        setProdutoAtual(produto);
        setIsEditing(produto.id ? true : false);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await atualizarProduto(produtoAtual);
        } else {
            await criarProduto(produtoAtual);
        }
    };

    useEffect(() => {
        recuperarProdutos();
    }, []);

    return (
        <ProdutoContext.Provider value={{
            alerta, setAlerta,
            listaProdutos,
            recuperarProdutos,
            removerProduto,
            criarProduto,
            atualizarProduto
        }}>
            <div className="container mt-4">

                {alerta.message && (
                    <div className={`alert alert-${alerta.status}`} role="alert">
                        {alerta.message}
                    </div>
                )}

                <Button variant="primary" className="mb-3" onClick={() => openModal()}>Adicionar Produto</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.tipo}</td>
                                <td>{produto.preco}</td>
                                <td>{produto.estoque}</td>
                                <td>
                                    <Button variant="warning" onClick={() => openModal(produto)}>Editar</Button>
                                    <Button variant="danger" className="ml-2" onClick={() => removerProduto(produto.id)}>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="nome">
                                <Form.Label>Nome do Produto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do produto"
                                    value={produtoAtual.nome}
                                    onChange={(e) => setProdutoAtual({ ...produtoAtual, nome: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="tipo">
                                <Form.Label>Tipo do Produto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tipo do produto"
                                    value={produtoAtual.tipo}
                                    onChange={(e) => setProdutoAtual({ ...produtoAtual, tipo: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="preco">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Preço do produto"
                                    value={produtoAtual.preco}
                                    onChange={(e) => setProdutoAtual({ ...produtoAtual, preco: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="estoque">
                                <Form.Label>Estoque</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={produtoAtual.estoque}
                                    onChange={(e) => setProdutoAtual({ ...produtoAtual, estoque: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Atualizar Produto' : 'Criar Produto'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </ProdutoContext.Provider>
    );
}

export default Produto;
