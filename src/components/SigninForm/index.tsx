import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface AuthData {
  signin?: (email: string, password: string) => string;
}

const SigninForm: React.FC = () => {

  const authData = useAuth();


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    if (authData != null && authData.signin) {
      try{
        const res = authData.signin(email, senha);
        navigate("/home");
      }catch(e){
        setError("Função de autenticação não encontrada");
      }
    }
  };

  return (
    <C.Container>
      <C.Label>GGP - Gestão de Gastos Pessoais</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
        />
        <C.Label>{error}</C.Label>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não possui uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default SigninForm;