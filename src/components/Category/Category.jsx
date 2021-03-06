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
import {
  showCategories,
  deleteCategory,
  updateCategory,
} from "../../Redux/actions/actionsCategory";
import { useDispatch } from "react-redux";
import CategoryAlert from "../CategoryStore/Alert";

export default function Category() {
  const token = useSelector((state) => state.admin.token);
  const categories = useSelector((state) => state.categories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  function handleUpdateCategory(newCategoryName, categoryName) {
    axios
      .put(
        "http://localhost:8000/api/admin/categorias",
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
      )
      .then((res) => {
        dispatch(updateCategory(newCategoryName, categoryName));
        setText(res.data.message);
        setShow(true);
      });
  }

  function handleDeleteCategory(categoryName, token) {
    axios
      .delete(
        "http://localhost:8000/api/admin/categorias",

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
        dispatch(deleteCategory(categoryName));
        setText(res.data.message);
        setShow(true);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/productos/lista/categorias")
      .then((res) => {
        dispatch(showCategories(res.data));
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
                            handleUpdateCategory(newCategoryName, category.name)
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
                    bsStyle="danger"
                    type="button"
                    simple
                    onClick={() => {
                      handleDeleteCategory(category.name, token);
                    }}
                  >
                    <i className="fa fa-times" />
                  </Button>
                </Col>
              </Row>
            );
          })}
        <Row>
          <Col>
            <CategoryAlert show={show} setShow={setShow} text={text} />
          </Col>
        </Row>
      </Grid>
    </>
  );
}
