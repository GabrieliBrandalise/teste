import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carregando from '../../commons/Carregando';
import Alerta from '../../commons/Alerta';
import CampoEntrada from '../../commons/CampoEntrada';
import { adicionarUsuarioAPI } from '../../services/UsuarioServico';
import Button from 'react-bootstrap/Button';

function CreateAccount() {
  const [usuario, setUsuario] = useState({
    nome: "", email: "", telefone: "", senha: "", tipo: ""
  });

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const retornoAPI = await adicionarUsuarioAPI(usuario);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

      if (retornoAPI.status === "success") {
        setTimeout(() => navigate("/privado"), 2000);
      }

    } catch (err) {
      console.error(err.message);
      setAlerta({ status: "error", message: err.message });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <Carregando carregando={carregando}>
            <Alerta alerta={alerta} />
            <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Criar Conta</h1>

              <CampoEntrada
                id="txtNome" name="nome" label="Nome"
                tipo="text" value={usuario.nome}
                onchange={e => setUsuario({ ...usuario, nome: e.target.value })}
                requerido={true} readonly={false}
                msgvalido="Nome OK" msginvalido="Informe o nome"
                maxCaracteres={40}
              />

              <CampoEntrada
                id="txtEmail" name="email" label="Email"
                tipo="email" value={usuario.email}
                onchange={e => setUsuario({ ...usuario, email: e.target.value })}
                requerido={true} readonly={false}
                msgvalido="Email OK" msginvalido="Informe o email"
                maxCaracteres={40}
              />

              <CampoEntrada
                id="txtTelefone" name="telefone" label="Telefone"
                tipo="text" value={usuario.telefone}
                onchange={e => setUsuario({ ...usuario, telefone: e.target.value })}
                requerido={false} readonly={false}
                msgvalido="Telefone OK" msginvalido="Informe o telefone"
                maxCaracteres={15}
              />

              <CampoEntrada
                id="txtSenha" name="senha" label="Senha"
                tipo="password" value={usuario.senha}
                onchange={e => setUsuario({ ...usuario, senha: e.target.value })}
                requerido={true} readonly={false}
                msgvalido="Senha OK" msginvalido="Informe a senha"
                maxCaracteres={20}
              />

              <div className="form-group mb-3">
                <label htmlFor="tipo">Tipo de Usuário</label>
                <select
                    id="tipo"
                    name="tipo"
                    className="form-control"
                    value={usuario.tipo}
                    onChange={(e) => setUsuario({ ...usuario, tipo: e.target.value })}
                    required
                >
                    <option value="">Selecione o tipo</option>
                    <option value="C">Cliente</option>
                    <option value="A">Administrador</option>
                </select>
              </div>


              <Button className="w-100 btn-lg mt-3" type="submit" variant="success">
                Cadastrar
              </Button>

              <Button className="w-100 btn-lg mt-2" variant="secondary" onClick={() => navigate("/login")}>
                Voltar para Login
              </Button>
            </form>
          </Carregando>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
