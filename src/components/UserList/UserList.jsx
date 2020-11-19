import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./UserList.css";

const UserList = () => {
  const store = useSelector((state) => state);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    store.admin.token &&
      fetch(`https://electrohack-server.vercel.app/api/admin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.admin.token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setAdmins(data);
        });
  }, []);

  console.log("admins", admins);

  return (
    <div className="container">
      <h2 className="text-center">Listado de Administradores</h2>
      {admins.map((admin) => {
        return (
          <div className="box">
            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>Nombre:</strong> {admin.firstname} {admin.lastname}
                </p>
              </div>
              <div className="col-md-3">
                <strong>Email: </strong>
                {admin.email}
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary">Editar</button>
              </div>
              <div className="col-md-3">
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
