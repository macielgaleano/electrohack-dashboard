import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Row, Col, Table } from "react-bootstrap";
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
      <Grid fluid={true}>
        <h2 className="text-center">Listado de Administradores</h2>
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

export default UserList;
