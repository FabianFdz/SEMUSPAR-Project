"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      className="rounded-lg py-2 px-3 bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white"
      onClick={() => signIn()}
    >
      Ingresar
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="rounded-lg py-2 px-3 bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white"
      onClick={() => signOut()}
    >
      Cerrar Sesión
    </button>
  );
};
