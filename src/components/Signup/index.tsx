import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../components/hooks/useAuth";

interface AuthData {
  signup?: (email: string, password: string) => string;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const authData = useAuth();

  //Erros de criação
  const handleSignup = () => {
    if (!email || !emailConf || !senha) {
      setError("Preencha todos os campos");
    } else if (email !== emailConf) {
      setError("Os campos de email precisam ser iguais");
    } else {
      // Caso não haja erro ele salvará os dados
      if (authData != null && authData.signup) {
        try {
          const res = authData.signup(email, senha);
          alert("Usuário cadastrado com sucesso!");
          navigate("/");
        } catch (e) {
          setError("Função de cadastro não encontrada");
        }
      }
    }
  };

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmailConf(e.target.value)
          }
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSenha(e.target.value)
          }
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já possui uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entrar</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
