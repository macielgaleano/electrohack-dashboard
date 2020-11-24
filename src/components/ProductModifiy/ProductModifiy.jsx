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
  ButtonToolbar,
  SplitButton,
  MenuItem,
} from "react-bootstrap";

export default function ProductModifiy({ show, setShow, data }) {
  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState(0);
  const [brandProduct, setBrandProduct] = useState("");
  const [pictureProduct, setPictureProduct] = useState("");
  const [stockProduct, setStockProduct] = useState(0);
  const [categoryProduct, setCategoryProduct] = useState("");
  const [outStadingProduct, setOutstadingProduct] = useState(false);
  const [outStadingNameProduct, SetOutStadingNameProduct] = useState("No");
  const [categoriaName, setCategoriaName] = useState("*Ingrese una categoria");
  const [categorias, setCategorias] = useState([]);
  const token = useSelector((state) => state.admin.token);
  const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
  let addCategory = async () => {
    // e.preventDefault();
    await axios
      .get("https://electrohack-server.vercel.app/productos/lista/categorias")
      .then((items) => setCategorias(items.data));
  };
  addCategory();
  function handleSubmit(data) {
    axios.post("https://electrohack-server.vercel.app/api/admin/productos");
  }
  let handleClose = () => {
    setShow(false);
  };

  let handleShow = () => {
    setShow(true);
  };

  let addCategoryId = (e) => {
    e.preventDefault();
    setCategoryProduct(e.target.id);

    setCategoriaName(e.target.name);
  };

  let addOutStading = (e) => {
    e.preventDefault();
    console.log(e.target);
    SetOutStadingNameProduct("Si");
    setOutstadingProduct(true);
  };

  return (
    <>
      <div>
        <OverlayTrigger placement="top" overlay={edit}>
          <Button bsStyle="info" simple type="button" bsSize="xs" onClick={handleShow}>
            <i className="fa fa-edit" onClick={handleShow} />
          </Button>
        </OverlayTrigger>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                className="mt-5 mb-3"
                style={{
                  paddingBottom: "400px",
                }}
              >
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el nombre del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setNameProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese la descripcion del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setDescriptionProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el precio del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setPriceProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el stock del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setStockProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese La marca del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setBrandProduct(e.target.value)}
                />

                <FormControl.Feedback />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese la categoria del producto
                </ControlLabel>
                <ButtonToolbar>
                  <SplitButton title={categoriaName} dropup id="split-button-dropup">
                    {categorias &&
                      categorias.map((item, index) => {
                        return (
                          <MenuItem
                            eventKey={index}
                            key={index}
                            id={item._id}
                            name={item.name}
                            onClick={addCategoryId}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </SplitButton>
                </ButtonToolbar>
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  ¿Producto destacado?
                </ControlLabel>
                <ButtonToolbar>
                  <SplitButton
                    title={outStadingNameProduct}
                    dropup
                    id="split-button-dropup"
                  >
                    <MenuItem
                      eventKey={1}
                      key={1}
                      response={"Si"}
                      onClick={addOutStading}
                    >
                      Si
                    </MenuItem>
                    <MenuItem
                      eventKey={2}
                      key={2}
                      response={"No"}
                      onClick={addOutStading}
                    >
                      No
                    </MenuItem>
                  </SplitButton>
                </ButtonToolbar>

                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese La imagen del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setPictureProduct(e.target.value)}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
