import { getToken } from '../seguranca/Autenticacao';

export const adicionarUsuarioAPI = async (objeto) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/createaccount`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto),
        });
        return await response.json();
    }catch(err){
        throw new Error(`Erro ao cadastrar usuário: ${err.message}`);
    }
};

export const atualizarUsuarioAPI = async (objeto) => {
    try {
        const token = getToken();
        if (!token) {
            return { status: "error", message: "Token de autenticação não encontrado." };
        }
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify(objeto),
        });

        return await response.json();
     } catch (err) {
        throw new Error(`Erro ao atualizar usuário: ${err.message}`);
    }
};

export const getUsuarioAPI = async (id) => {
    try {
        const token = getToken();
        if (!token) {
            return { status: "error", message: "Token de autenticação não encontrado." };
        }

        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token 
            }
        });
        return await response.json();
    } catch (err) {
        throw new Error(`Erro ao buscar usuário por ID: ${err.message}`);
    }
};

export const addUsuarioAPI = async (usuario) => {
    try {
       
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/createaccount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario) 
        });
        return await response.json();
    } catch (err) {
        throw new Error(`Erro ao cadastrar usuário: ${err.message}`);
    }
};
