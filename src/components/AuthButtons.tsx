"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./lib";

export const LoginButton = () => {
  return (
    <Button variant="Primary" onClick={() => signIn()}>
      Ingresar
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="Danger" onClick={() => signOut()}>
      Cerrar Sesión
    </Button>
  );
};
