import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function UserModify() {
  const store = useSelector((state) => state);
  const [admins, setAdmins] = useState([]);
  const token = store.admin.token;

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
      <Grid fluid={true}>
        <h2 className="text-center">Eliminar Administradores</h2>
        <br></br>
        <Row>
          <Col md={11}>
            <Table bordered={true}>
              <thead>
                <tr style={{ color: "red" }}>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Creado</th>
                  <th>Editar</th>
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
}

export default UserModify;
