import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ProductModifiy() {
  const token = useSelector((state) => state.admin.token);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

<<<<<<< Updated upstream
  function deleteItem(slug, token) {
    axios
      .delete("http://localhost:8000/api/admin/productos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { slug: slug },
      })
      .then((res) => {
        const newsProducts = products.filter((product) => product.slug !== slug);
        setProducts(newsProducts);
      });
  }

  function updateProduct(e, formData, token) {
    setShow(false);
    axios.put("https://electrohack-server.vercel.app/productos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: formData.name,
        price: formData.price,
        outstanding: formData.outstanding,
        description: formData.description,
      },
    });
  }

=======
>>>>>>> Stashed changes
  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);

<<<<<<< Updated upstream
  return (
    <Grid>
      {products &&
        products.map((product) => {
          return (
            <div className="item-box">
              <Row key={product.slug}>
                <Col md={4}>{product.name}</Col>
                <Col md={2}>$ {product.price}</Col>
                <Col md={2}>
                  <Button bsStyle="success">Cambiar Imagen</Button>
                </Col>
                <Col md={2}>
                  <Button bsStyle="primary" onClick={handleShow}>
                    Editar
                  </Button>
=======
  useEffect(() => {
    axios
      .get("https://electrohack-server.vercel.app/productos/lista/categorias")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  function handleSubmit(data) {
    axios.post("https://electrohack-server.vercel.app/api/admin/productos");
  }
>>>>>>> Stashed changes

  return (
    <>
      <Grid fluid={true}>
        <h1>Editar productos</h1>
        <br></br>
        <Row>
          <Col md={11} sm={12}>
            <Table bordered={true}>
              <thead>
                <tr style={{ color: "red" }}>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Actualizado</th>
                  <th>Descripcion</th>
                  <th>Destacado</th>
                  <th>imagen</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={item.name}
                          />
                        </td>
                        <td>
                          <FormGroup controlId="formControlsSelect">
                            <FormControl
                              componentClass="select"
                              name="category"
                            >
                              {categories &&
                                categories.map((category) => {
                                  return (
                                    <option value={category._id}>
                                      {category.name}
                                    </option>
                                  );
                                })}
                            </FormControl>
                          </FormGroup>
                        </td>
                        <td>{item.updatedAt}</td>
                        <td>
                          <textarea
                            type="text"
                            className="form-control"
                            name="description"
                            id="description"
                            value={item.description}
                          />
                        </td>
                        <td>
                          <FormGroup controlId="formControlsSelect">
                            <FormControl
                              componentClass="select"
                              placeholder="select"
                              name="outstanding"
                            >
                              <option value={true}>Si</option>{" "}
                              <option value={false}>No</option>
                            </FormControl>
                          </FormGroup>
                        </td>
                        <td>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text"
                                id="inputGroupFileAddon01"
                              >
                                Upload
                              </span>
                            </div>
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                              />
                              <label
                                class="custom-file-label"
                                for="inputGroupFile01"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="stock"
                            id="stock"
                            value={item.stock}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="price"
                            id="price"
                            value={item.price}
                          />
                        </td>
                        <td>
                          <Button
                            onClick={handleSubmit}
                            className="btn btn-small btn-primary"
                          >
<<<<<<< Updated upstream
                            {product.outstanding ? (
                              <>
                                <option value={false}>No</option>
                                <option value={true} selected>
                                  Si
                                </option>
                              </>
                            ) : (
                              <>
                                <option value={false} selected>
                                  No
                                </option>
                                <option value={true}>Si</option>
                              </>
                            )}
                          </select>
                        </div>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                      </Button>
                      <Button
                        onSubmit={(e) => {
                          updateProduct(
                            e,
                            { name, description, price, outstanding },
                            token
                          );
                        }}
                        variant="primary"
                      >
                        Actualizar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <Col md={2}>
                  <Button
                    bsStyle="danger"
                    onClick={() => deleteItem(product.slug, token)}
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </div>
          );
        })}
    </Grid>
=======
                            Editar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            ;
          </Col>
        </Row>
      </Grid>
    </>
>>>>>>> Stashed changes
  );
}
