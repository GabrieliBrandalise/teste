export const getClientesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export const getClientePorIdAPI = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export const deleteClienteAPI = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export const adicionarClienteAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}

export const atualizarClienteAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}
