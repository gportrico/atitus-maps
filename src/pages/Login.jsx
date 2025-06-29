import React, { useState } from "react";
import { Navbar, Logo, Title, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import eventBg from "../assets/images/event01.jpg"; // importação da imagem

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <>
      {/* Imagem de fundo no topo */}
      <img
        src={eventBg}
        alt="Evento"
        className="fixed top-0 left-0 w-full max-h-75 object-cover z-0"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative max-w-md mx-auto p-4 z-10">

        <div className="text-center">
          <Logo />
        </div>

        <div className="pt-6 pb-4">
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Input
              label="Email"
              placeholder="Digite seu email..."
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <Input
              label="Senha"
              placeholder="Digite sua senha..."
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className="text-center pt-4">
            <Button type="submit">Login</Button>
          </div>
        </form>

        <div className="text-center pt-8">
          <Link
            to="/register"
            className="text-black-600 hover:underline"
          >
            Primeira vez aqui? <strong>Cadastre-se</strong>
          </Link>
        </div>
      </div>
    </>
  );
}