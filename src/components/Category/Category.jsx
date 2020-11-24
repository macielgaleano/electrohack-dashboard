import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Category() {
  const token = useSelector((state) => state.admin.token);
  const categories = useSelector((state) => state.categories);
  const [newCategoryName, setNewCategoryName] = useState("");

  function updateCategory(newCategoryName, categoryName) {
    axios.put(
      "https://electrohack-server.vercel.app/api/admin/categorias",
      {
        nameToSearch: categoryName,
        newCategoryName: newCategoryName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  function deleteCategory(categoryName, token) {
    axios
      .delete(
        "https://electrohack-server.vercel.app/api/admin/categorias",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            name: categoryName,
          },
        }
      )
      .then((res) => {
        const newCategoriesList = categories.filter(
          (category) => category.name !== categoryName
        );
        setCategories(newCategoriesList);
      });
  }

  useEffect(() => {
    axios
      .get("https://electrohack-server.vercel.app/productos/lista/categorias")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);
  return (
    <>
      <h1>Categorias</h1>
      <Grid>
        {categories &&
          categories.map((category) => {
            return (
              <Row>
                <Col md={4}>
                  <h6>{category.name}</h6>
                  <h6>{category.createdAt}</h6>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Button>
                        <Button
                          type="submit"
                          onClick={() =>
                            updateCategory(newCategoryName, category.name)
                          }
                        >
                          Cambiar Nombre
                        </Button>
                      </InputGroup.Button>
                      <FormControl
                        type="text"
                        placeholder="Introduce un nuevo nombre para la categoría..."
                        onChange={(e) => {
                          setNewCategoryName(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => {
                      deleteCategory(category.name, token);
                    }}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            );
          })}
      </Grid>
    </>
  );
}
