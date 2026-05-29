import {
  createContext,
  useEffect,
  useState,
} from "react";

import { apiFetch } from "../services/api";

export const AuthContext =
  createContext(null);

export default function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (token && savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);

  }, []);

  const login = async (
    email,
    password
  ) => {
    try {
      const response =
        await apiFetch(
          "/login",
          {
            method: "POST",

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      setUser(response.user);
      return {

        success: true,

        role:
          response.user.access_level ===
            "docente"
            ? "admin"
            : "user"
      };

    } catch (error) {

      console.error(error);
      return {
        success: false,

        message:
          error?.data?.message ||

          Object.values(
            error?.data?.errors || {}
          )[0]?.[0] ||

          "Erro ao realizar login",

        errors:
          error?.data?.errors || {}
      };
    }
  };

  const register = async ({
    name,
    email,
    password,
    password_confirmation,
    cpf
  }) => {
    try {
      const response =
        await apiFetch(
          "/register",
          {
            method: "POST",

            body: JSON.stringify({
              name,
              email,
              password,
              password_confirmation,
              cpf,
              link_type:
                "interno",

              access_level:
                "aluno",

              active: true,
            }),
          }
        );

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      setUser(response.user);

      return {
        success: true
      };

    } catch (error) {
      console.error(error);
      return {
        success: false,

        message:
          error?.data?.message ||

          Object.values(
            error?.data?.errors || {}
          )[0]?.[0] ||

          "Erro ao cadastrar",

        errors:
          error?.data?.errors || {}
      };
    }
  };

  const logout = async () => {
    try {
      await apiFetch(
        "/logout",
        {
          method: "POST",
        }
      );

    } catch (error) {
      console.error(error);

    } finally {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      setUser(null);
    }
  };

  if (loading) return null;

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}