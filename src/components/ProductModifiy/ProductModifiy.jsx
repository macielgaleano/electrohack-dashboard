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

export default function ProductModifiy({ data }) {
  const [show, setShow] = useState(false);
  const [nameProduct, setNameProduct] = useState(data.name);
  const [descriptionProduct, setDescriptionProduct] = useState(data.description);
  const [priceProduct, setPriceProduct] = useState(data.price);
  const [brandProduct, setBrandProduct] = useState(data.brand);
  const [pictureProduct, setPictureProduct] = useState(data.picture);
  const [stockProduct, setStockProduct] = useState(data.stock);
  const [categoryProduct, setCategoryProduct] = useState(data.category);
  const [outStadingProduct, setOutstadingProduct] = useState(false);
  const [outStadingNameProduct, SetOutStadingNameProduct] = useState("No");
  const [categoriaName, setCategoriaName] = useState("*Ingrese una categoria");
  const [categorias, setCategorias] = useState([]);
  const token = useSelector((state) => state.admin.token);
  const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
  useEffect(() => {
    let addCategory = async () => {
      await axios
        .get("https://electrohack-server.vercel.app/productos/lista/categorias")
        .then((items) => setCategorias(items.data));
    };
    addCategory();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .put(
        "https://electrohack-server.vercel.app/api/admin/productos",
        {
          name: nameProduct,
          description: descriptionProduct,
          price: priceProduct,
          brand: brandProduct,
          pictures: [pictureProduct],
          stock: stockProduct,
          category: categoryProduct,
          outstading: outStadingProduct,
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
            <Modal.Title>Editar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" className="mt-5 mb-3">
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el nombre del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese la descripcion del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  value={descriptionProduct}
                  placeholder="Enter text"
                  onChange={(e) => setDescriptionProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el precio del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  value={priceProduct}
                  placeholder="Enter text"
                  onChange={(e) => setPriceProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el stock del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  value={stockProduct}
                  placeholder="Enter text"
                  onChange={(e) => setStockProduct(e.target.value)}
                />
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese La marca del producto
                </ControlLabel>
                <FormControl
                  type="text"
                  value={brandProduct}
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
                  value={pictureProduct}
                  placeholder="Enter text"
                  onChange={(e) => setPictureProduct(e.target.value)}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Modificar producto</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
