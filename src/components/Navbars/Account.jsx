import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Account() {
  const token = useSelector((state) => state.admin.token);
  let link;
  if (token) {
    link = <Link to="/">Bienvenido administrador</Link>;
  } else {
    link = <Link to="/login">Iniciar sesion</Link>;
  }

  return link;
}
