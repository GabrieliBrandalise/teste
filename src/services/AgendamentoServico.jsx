import { getToken } from '../seguranca/Autenticacao';
export const getAgendamentosAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/agendamento`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 "authorization": getToken()
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao recuperar os agendamentos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteAgendamentoAPI = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/agendamento/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                 "authorization": getToken()
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao remover o agendamento');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const adicionarAgendamentoAPI = async (objeto) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/agendamento`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                 "authorization": getToken()
            },
            body: JSON.stringify(objeto),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro da API:', errorData);
            throw new Error(errorData.message || 'Erro ao adicionar o agendamento');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}


export const atualizarAgendamentoAPI = async (id, objeto) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/agendamento/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",  "authorization": getToken() },
            body: JSON.stringify(objeto),
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar o agendamento');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
