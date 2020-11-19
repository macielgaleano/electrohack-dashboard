import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);
  console.log(products);

  return (
    <Grid fluid={true}>
      <h1>Lista de productos</h1>
      <br></br>
      <Row>
        <Col md={11}>
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
              </tr>
            </thead>
            <tbody>
              {products !== [] &&
                products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.description}</td>
                      <td>{item.outstading}</td>
                      <td>{item.stock}</td>
                      <td>{item.price}</td>
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
