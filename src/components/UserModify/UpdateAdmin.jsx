import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import {
  Tooltip,
  OverlayTrigger,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";

export default function UpdateAdmin({ data }) {
  const [show, setShow] = useState(false);
  const [adminName, setAdminName] = useState(data.firstname);
  const [adminLastname, setAdminLastname] = useState(data.lastname);
  const [adminEmail, setAdminEmail] = useState(data.email);
  const token = useSelector((state) => state.admin.token);
  const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .put(
        "https://electrohack-server.vercel.app/api/admin",
        {
          firstname: adminName,
          lastname: adminLastname,
          email: adminEmail,
          id: data.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
    setShow(false);
  }
  let handleClose = () => {
    setShow(false);
  };

  let handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div>
        <OverlayTrigger placement="top" overlay={edit}>
          <Button
            bsStyle="info"
            simple
            type="button"
            bsSize="xs"
            onClick={handleShow}
          >
            <i className="fa fa-edit" onClick={handleShow} />
          </Button>
        </OverlayTrigger>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" className="mt-5 mb-3">
                <ControlLabel
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                >
                  Nombre
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
                <ControlLabel
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                >
                  Apellido
                </ControlLabel>
                <FormControl
                  type="text"
                  value={adminLastname}
                  placeholder="Enter text"
                  onChange={(e) => setAdminLastname(e.target.value)}
                />
                <ControlLabel
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                >
                  email
                </ControlLabel>
                <FormControl
                  type="email"
                  value={adminEmail}
                  placeholder="Enter text"
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Modificar administrador</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
