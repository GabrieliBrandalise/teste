import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../seguranca/Autenticacao';
import Carregando from '../../commons/Carregando';
import Alerta from '../../commons/Alerta';
import CampoEntrada from '../../commons/CampoEntrada';
import {atualizarUsuarioAPI} from '../../services/UsuarioServico'
import Button from 'react-bootstrap/Button';

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);
     const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "", email: "", telefone: "", senha: "", tipo: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();
    const atualizarUsuario = async (usuario) => {
            try{
            const retornoAPI = await atualizarUsuarioAPI(usuario);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            }catch(err){
                console.error(err.message);
                setAlerta({ status: "error", message: err.message })
            }
    };

     const openModal = (usuario = {
    nome: "", email: "", telefone: "", senha: "", tipo: ""
  }) => {
    setUsuarioLogado(usuario);
    setIsEditing(true);
    setEmail(usuario.email || "");
    setSenha(usuario.senha || "");
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

    if (autenticado === true) {
        return <Navigate to="/privado" />
    }

    return (
        <div className="container"  >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={handleSubmit}>
                            <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>
                            <CampoEntrada value={email}
                                id="txtEmail" name="email" label="Nome"
                                tipo="email" onchange={e => {
                                    setUsuarioLogado({ ...usuarioLogado, email: e.target.value });
                                    setEmail(e.target.value);
                                 }
                                }
                                msgvalido="Email OK" msginvalido="Informe o email"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={(e) => {
                                    setUsuarioLogado({ ...usuarioLogado, senha: e.target.value });
                                    setSenha(e.target.value);
                                    }}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                        </form>

                         <div className="mt-4 d-flex flex-row gap-2 justify-content-center">
                        <Button variant="success" onClick={() => navigate("/createaccount")}>
                            Criar Usuário
                        </Button>
                        <Button variant="info" onClick={acaoLogin}>
                            Login
                        </Button>
                        <Button variant="secondary" onClick={() => openModal(usuarioLogado)}>
                            Editar
                        </Button>
                        </div>
                    </Carregando>
                </div>
            </div>
        </div>
    )

}

export default Login;