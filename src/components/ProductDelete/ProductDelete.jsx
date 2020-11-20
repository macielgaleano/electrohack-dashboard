import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ProductDelete.css";

const ProductDelete = () => {
  const token = useSelector((state) => state.admin.token);
  const [products, setProducts] = useState(null);

  function deleteItem(slug, token) {
    axios
      .delete("https://electrohack-server.vercel.app/api/admin/productos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { slug: slug },
      })
      .then((res) => {
        const newsProducts = products.filter(
          (product) => product.slug !== slug
        );
        setProducts(newsProducts);
      });
  }

  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <Grid>
        <h1>Eliminar productos</h1>
        {products &&
          products.map((product) => {
            return (
              <div className="item-box">
                <Row key={product.slug}>
                  <Col md={6}>{product.name}</Col>
                  <Col md={3}>{product.brand}</Col>
                  <Col md={2}>$ {product.price}</Col>
                  <Col md={1}>
                    <Button
                      className="btn btn-sm btn-danger"
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
    </>
  );
};

export default ProductDelete;
