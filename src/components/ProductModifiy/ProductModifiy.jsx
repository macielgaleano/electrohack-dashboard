import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProductModify = () => {
  const token = useSelector((state) => state.admin.token);

  const [products, setProducts] = useState(null);

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
        console.log("se ejecuto");
      });
  }

  function updateItem(slug, token) {}
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
            <Row key={product.slug}>
              <Col md={5}>{product.name}</Col>
              <Col md={3}>{product.price}</Col>
              <Col md={2}>
                <button onClick={() => updateItem(product.slug, token)}>
                  Editar
                </button>
              </Col>
              <Col md={2}>
                <button onClick={() => deleteItem(product.slug, token)}>
                  Eliminar
                </button>
              </Col>
            </Row>
          );
        })}
    </Grid>
  );
};

export default ProductModify;
