import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../seguranca/Autenticacao';
import Carregando from '../../commons/Carregando';
import Alerta from '../../commons/Alerta';
import CampoEntrada from '../../commons/CampoEntrada';
import {atualizarUsuarioAPI, getUsuarioAPI} from '../../services/UsuarioServico'
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);
     const [usuarioLogado, setUsuarioLogado] = useState({
        id: null, nome: "", email: "", telefone: "", senha: "", tipo: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const atualizarUsuario = async (usuario) => {
            try{
                setCarregando(true);
                const retornoAPI = await atualizarUsuarioAPI(usuario);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (retornoAPI.status === "success") {
                localStorage.setItem("usuarioLogado", JSON.stringify(retornoAPI.objeto));
                setIsEditing(false);
                setAlerta({ status: "success", message: "Usuário atualizado com sucesso!" });
                navigate("/privado"); 
            }
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: err.message })
        } finally {
            setCarregando(false);
        }
    };

    const openModal = (usuarioParaEditar) => {
        setUsuarioLogado(usuarioParaEditar);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await atualizarUsuario(usuarioLogado);
        } else {
            await acaoLogin();
        }
    };

    const acaoLogin = async e => {

        e.preventDefault();

        try {
            const body = {
                email: email,
                senha: senha
            };
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(json => {
                    if (json.auth === false) {
                        setAlerta({ status: "error", message: json.message })
                    }
                    if (json.auth === true) {
                        setAutenticado(true);
                        gravaAutenticacao(json);
                        localStorage.setItem("usuarioLogado", JSON.stringify(json.usuario)); 
                    }
                });
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: err.message })
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({ status: "error", message: err != null ? err.message : "" });
        }
    }, []);

     useEffect(() => {
        const params = new URLSearchParams(location.search);
        const editar = params.get("editar");
        
        if (editar === "true") {
            const usuarioStorage = localStorage.getItem("usuarioLogado");
            if (usuarioStorage) {
                const usuarioLocal = JSON.parse(usuarioStorage);

                if (!usuarioLocal.id) { 
                    setAlerta({ status: "error", message: "ID do usuário não encontrado para edição." });
                    setIsEditing(false);
                    return;
                }

                const fetchUsuarioForEdit = async () => {
                    try {
                        setCarregando(true);
                        const retornoAPI = await getUsuarioAPI(usuarioLocal.id); 

                        if (retornoAPI.status === "success" && retornoAPI.objeto) {
                            openModal(retornoAPI.objeto);
                        } else {
                            setAlerta({ status: "error", message: retornoAPI.message || "Erro ao carregar dados do usuário para edição." });
                            setIsEditing(false);
                        }
                    } catch (err) {
                        setAlerta({ status: "error", message: "Erro ao carregar dados do usuário para edição: " + err.message });
                        console.error("Erro ao buscar usuário para edição:", err);
                        setIsEditing(false);
                    } finally {
                        setCarregando(false);
                    }
                };
                fetchUsuarioForEdit();
            } else {
                setAlerta({ status: "error", message: "Nenhum usuário logado encontrado para edição." });
                setIsEditing(false);
            }
        } else {
            setIsEditing(false);
        }
    }, [location]);
    
    if (autenticado === true && location.search.indexOf("editar=true") === -1) {
        return <Navigate to="/privado" />
    }

    return (
        <div className="container"  >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={handleSubmit}>
                            <h1 className="h3 mb-3 fw-normal">{isEditing ? "Editar Perfil" : "Login de Usuário"}</h1>
                           
                           {!isEditing && (
                            <>
                            <CampoEntrada value={email}
                                id="txtEmail" name="email" label="Nome"
                                tipo="email" onchange={e => {setEmail(e.target.value);}}
                                msgvalido="Email OK" msginvalido="Informe o email"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={(e) => {setSenha(e.target.value);}}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                                </>
                           )}

                           {isEditing && (
                                <>
                                    <CampoEntrada value={usuarioLogado.nome}
                                        id="txtNome" name="nome" label="Nome"
                                        tipo="text" onchange={e => {
                                            setUsuarioLogado({ ...usuarioLogado, nome: e.target.value });
                                        }}
                                        msgvalido="Nome OK" msginvalido="Informe o nome"
                                        requerido={true} readonly={false}
                                        maxCaracteres={100} />
                                    <CampoEntrada value={usuarioLogado.email}
                                        id="txtEmailEdicao" name="email" label="Email"
                                        tipo="email" onchange={e => {
                                            setUsuarioLogado({ ...usuarioLogado, email: e.target.value }); 
                                        }}
                                        msgvalido="Email OK" msginvalido="Informe o email"
                                        requerido={true} readonly={false} 
                                        maxCaracteres={40} />
                                    <CampoEntrada value={usuarioLogado.telefone}
                                        id="txtTelefone" name="telefone" label="Telefone"
                                        tipo="text" onchange={e => {
                                            setUsuarioLogado({ ...usuarioLogado, telefone: e.target.value });
                                        }}
                                        msgvalido="Telefone OK" msginvalido="Informe o telefone"
                                        requerido={true} readonly={false}
                                        maxCaracteres={20} />
                                    <CampoEntrada value={usuarioLogado.senha}
                                        id="txtSenhaEdicao" name="senha" label="Nova Senha (deixe em branco para não alterar)"
                                        tipo="password" onchange={e => {
                                            setUsuarioLogado({ ...usuarioLogado, senha: e.target.value });
                                        }}
                                        msgvalido="Senha OK" msginvalido=""
                                        requerido={false} readonly={false}
                                        maxCaracteres={40} />
                                     <div className="form-group mb-3">
                                        <label htmlFor="tipo">Tipo de Usuário</label>
                                        <select
                                            id="tipo"
                                            name="tipo"
                                            className="form-control"
                                            value={usuarioLogado.tipo}
                                            onChange={(e) => setUsuarioLogado({ ...usuarioLogado, tipo: e.target.value })}
                                            required
                                        >
                                            <option value="">Selecione o tipo</option>
                                            <option value="C">Cliente</option> 
                                            <option value="A">Administrador</option> 
                                        </select>
                                    </div>
                                </>
                            )}
                        </form>

                         <div className="mt-4 d-flex flex-row gap-2 justify-content-center">
                           {!isEditing && (
                                <>
                                    <Button variant="success" onClick={() => navigate("/createaccount")}>
                                        Criar Usuário
                                    </Button>
                                    <Button variant="info" onClick={acaoLogin}>
                                        Login
                                    </Button>
                                </>
                           )}
                           {isEditing && (
                                 <>
                                    <Button variant="primary" type="submit">
                                        Atualizar
                                     </Button>
                                    <Button variant="secondary" onClick={() => {
                                        setIsEditing(false);
                                        setUsuarioLogado({ id: null, nome: "", email: "", telefone: "", senha: "", tipo: "" });
                                        setAlerta({ status: "", message: "" });
                                        navigate("/privado");
                                        }}>
                                        Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                    </Carregando>
                </div>
            </div>
        </div>
    )

}

export default Login;