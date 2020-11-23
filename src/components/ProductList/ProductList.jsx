import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table, OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);
  const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
  let number;
  return (
    <Grid fluid={true}>
      <h1>Lista de productos</h1>
      <br></br>
      <Row>
        <Col md={11} sm={12}>
          <Table bordered={true}>
            <thead>
              <tr style={{ color: "red" }}>
                <th>#</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Creado</th>
                <th>Descripcion</th>
                <th>Destacado</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {products !== [] &&
                products.map((item, i) => {
                  number = "checkbox" + i;
                  return (
                    <tr key={i}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.description}</td>
                      <td>{item.outstading}</td>
                      <td>{item.stock}</td>
                      <td>{item.price}</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger placement="top" overlay={edit}>
                          <Button bsStyle="info" simple type="button" bsSize="xs">
                            <i className="fa fa-edit" />
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={remove}>
                          <Button bsStyle="danger" simple type="button" bsSize="xs">
                            <i className="fa fa-times" />
                          </Button>
                        </OverlayTrigger>
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
  );
};

export default ProductList;
