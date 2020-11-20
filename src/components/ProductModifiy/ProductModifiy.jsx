import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isForInStatement, isForOfStatement } from "typescript";

const ProductModify = () => {
  const token = useSelector((state) => state.admin.token);
  const [products, setProducts] = useState(null);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [outstanding, setOutstanding] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);

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

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Modificar datos del producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <div class="form-group">
                          <label for="name">Nombre del Producto</label>
                          <input
                            type="text"
                            name="name"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={product.name}
                            class="form-control"
                            id="name"
                          />
                        </div>
                        <div class="form-group">
                          <label for="price">Precio</label>
                          <input
                            type="text"
                            name="price"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                            value={product.price}
                            class="form-control"
                            id="price"
                          />
                        </div>
                        <div class="form-group">
                          <label for="description">Descripción</label>
                          <textarea
                            type="text"
                            name="description"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                            value={product.description}
                            class="form-control"
                            id="description"
                            placeholder="Example input placeholder"
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label for="outstanding">Destacado</label>
                          <select
                            id="outstanding"
                            name="outstanding"
                            class="form-control"
                          >
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
  );
};

export default ProductModify;
