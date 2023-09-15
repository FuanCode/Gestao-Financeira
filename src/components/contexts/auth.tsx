import React, { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signed: boolean;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.find(
        (user: User) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const signin = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") ||  "");

    const hasUser = usersStorage?.find((user: User) => user.email === email);

    if (hasUser) {
      if (hasUser.email === email && hasUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "Senha ou Email incorreto! Você pode se registrar clicando em Registre-se";
      }
    } else {
      return "Usuário Inexistente. Registre-se";
    }
  };

  const signup = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") ||  "");  

    const hasUser = usersStorage?.find((user: User) => user.email === email);

    if (hasUser) {
      return "Este Email já se encontra registrado! Você pode acessar clicando em Entrar";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
