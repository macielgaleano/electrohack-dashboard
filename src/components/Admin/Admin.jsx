import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import "./Admin.css";
import axios from "axios";
import UpdateAdmin from "../UserModify/UpdateAdmin";

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
                {admins.map((admin, i) => {
                  return (
                    <tr key={i}>
                      <td>{admin._id}</td>
                      <td>{admin.firstname}</td>
                      <td>{admin.lastname}</td>
                      <td>{admin.email}</td>
                      <td>{admin.createdAt}</td>
                      <td>
                        <UpdateAdmin
                          bsStyle="primary"
                          key={i}
                          data={{
                            firstname: admin.firstname,
                            lastname: admin.lastname,
                            email: admin.lastname,
                          }}
                        />
                      </td>
                      <td>
                        <Button
                          bsStyle="danger"
                          type="button"
                          simple
                          bsSize="xs"
                          onClick={() => deleteItem(admin.email)}
                        >
                          <i
                            className="fa fa-times"
                            onClick={() => deleteItem(admin.email)}
                          />
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
