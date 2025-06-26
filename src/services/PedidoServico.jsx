import { getToken } from '../seguranca/Autenticacao';
export const getPedidosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedido`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "authorization": getToken()
        }
    });
    return await response.json();
}

export const getPedidoPorIdAPI = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedido/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "authorization": getToken()
        }
    });
    return await response.json();
}

export const deletePedidoAPI = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedido/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
             "authorization": getToken()
        }
    });
    return await response.json();
}

export const adicionarPedidoAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json",  "authorization": getToken() },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}

export const atualizarPedidoAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedido`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",  "authorization": getToken() },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}
