import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import ProductDelete from "../ProductDelete/ProductDelete";
import ProductModify from "../ProductModifiy/ProductModifiy";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const getProducts = (newsProducts) => {
    setProducts(newsProducts);
  };
  return (
    <Grid fluid={true}>
      <h1>Lista de productos</h1>
      <br></br>
      <Row>
        <Col md={11} sm={12}>
          <div className="table-full-width">
            <table className="table">
              <thead>
                <tr style={{ color: "red" }}>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Creado</th>
                  <th>Descripcion</th>
                  <th>Destacado</th>
                  <th>Marca</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {products !== [] &&
                  products.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.brand}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.description}</td>
                        <td>{item.outstading}</td>
                        <td>{item.stock}</td>
                        <td>{item.price}</td>
                        <td
                          className="td-actions text-right d-flex"
                          style={{
                            display: "flex",
                            justifyContent: "beetwen",
                          }}
                        >
                          <ProductModify
                            key={i}
                            data={{
                              name: item.name,
                              category: item.category,
                              description: item.description,
                              outstading: item.outstading,
                              stock: item.stock,
                              price: item.price,
                              brand: item.brand,
                              picture: item.pictures[0],
                            }}
                          />

                          <ProductDelete
                            slug={item.slug}
                            getProducts={getProducts}
                          ></ProductDelete>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default ProductList;
