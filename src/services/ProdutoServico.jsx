export const getProdutosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getProdutoPorIdAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteProdutoAPI = async id => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const adicionarProdutoAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}

export const atualizarProdutoAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}