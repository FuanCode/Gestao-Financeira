import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface AuthData {
  signin?: (email: string, password: string) => string;
}



const SigninForm: React.FC = () => {

  let retrievedData = JSON.parse(sessionStorage.getItem("usuario_bd") || "{}");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error] = useState<string>("");

  const handleLogin = () => {
    if(retrievedData.email === email && retrievedData.senha === senha){
      Swal.fire(
        'Sucesso',
        'Logado com sucesso.',
        'success'
      ).then(() => {
        window.location.href = "/home";
      });
    }else{
      Swal.fire(
        'Erro',
        'Usuário ou senha incorreta.',
        'error'
      );
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