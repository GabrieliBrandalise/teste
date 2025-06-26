import { getToken } from '../seguranca/Autenticacao';
export const getItensPedidoPorPedidoIdAPI = async (pedidoId) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itempedido/${pedidoId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "authorization": getToken()
        }
    });
    return await response.json();
}

export const deleteItemPedidoAPI = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itempedido/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
             "authorization": getToken()
        }
    });
    return await response.json();
}

export const adicionarItemPedidoAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itempedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json",  "authorization": getToken() },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}

export const atualizarItemPedidoAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itempedido`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",  "authorization": getToken() },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}
