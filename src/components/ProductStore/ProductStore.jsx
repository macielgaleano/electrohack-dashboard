import React, { useState } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
  SplitButton,
  MenuItem,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProductStore = () => {
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

  const store = useSelector((state) => state);
  const history = useHistory();
  let addCategory = async () => {
    // e.preventDefault();
    await axios
      .get("https://electrohack-server.vercel.app/productos/lista/categorias")
      .then((items) => setCategorias(items.data));
  };
  addCategory();

  let addProduct = async (e) => {
    console.log("si");
    e.preventDefault();
    await axios
      .post(
        "https://electrohack-server.vercel.app/api/admin/productos",
        {
          name: nameProduct,
          description: descriptionProduct,
          price: priceProduct,
          brand: brandProduct,
          pictures: [pictureProduct],
          stock: stockProduct,
          category: categoryProduct,
          outstanding: outStadingProduct,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.admin.token}`,
          },
        }
      )
      .then((admin) => {
        console.log(admin);
        history.push("/admin/ProductList");
      });
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
    <div>
      <Grid>
        <h1>Crear producto</h1>
        <Row>
          <Col sm={12} md={8}>
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
                <ButtonToolbar>
                  <Button
                    bsStyle="primary"
                    onClick={addProduct}
                    style={{
                      background: "#ccc",
                      color: "black",
                      marginTop: "20px",
                      border: "1px solid black",
                    }}
                  >
                    Agregar producto
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default ProductStore;
