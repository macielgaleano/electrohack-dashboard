import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
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
  function deleteItem(email) {
    axios
      .delete("https://electrohack-server.vercel.app/api/admin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.admin.token}`,
        },
        data: { email: email },
      })
      .then((res) => {
        const newsAdmin = admins.filter((admin) => admin.email !== email);

        setAdmins(newsAdmin);
      });
  }

  console.log("admins", admins);

  return (
    <div className="container">
      <Grid fluid={true}>
        <h2 className="text-center">Listado de Administradores</h2>
        <br></br>
        <Row>
          <Col md={12}>
            <Table bordered={true}>
              <thead>
                <tr style={{ color: "red" }}>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Creado</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  return (
                    <tr>
                      <td>{admin._id}</td>
                      <td>{admin.firstname}</td>
                      <td>{admin.lastname}</td>
                      <td>{admin.email}</td>
                      <td>{admin.createdAt}</td>
                      <td>
                        <Button
                          bsStyle="primary"
                          /*                           onClick={() => deleteItem(admin.email)}
                           */
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          bsStyle="danger"
                          onClick={() => deleteItem(admin.email)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Admin;
