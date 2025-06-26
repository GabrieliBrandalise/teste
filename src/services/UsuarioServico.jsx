export const adicionarUsuarioAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/createaccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}

export const atualizarUsuarioAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
}
