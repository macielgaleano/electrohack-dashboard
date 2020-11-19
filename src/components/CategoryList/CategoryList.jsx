import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://electrohack-server.vercel.app/productos/lista/categorias")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);
  console.log(categories);

  return (
    <Grid fluid={true}>
      <h1>Lista de categorias</h1>
      <br></br>
      <Row>
        <Col md={6}>
          <Table bordered={true}>
            <thead>
              <tr style={{ color: "red" }}>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {categories !== [] &&
                categories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
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

export default CategoryList;
