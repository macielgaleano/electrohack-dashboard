import React, { useState } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
} from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCategory } from "../../Redux/actions/actionsCategory";

const CategoryStore = () => {
  const categories = useSelector((state) => state.categories);
  const token = useSelector((state) => state.admin.token);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  function handleAddCategory(categoryName, token) {
    axios
      .post(
        "http://localhost:8000/api/admin/categorias",
        {
          name: categoryName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(addCategory(res.data.category));
      });
  }

  return (
    <div>
      <Grid>
        <h1>Crear categoria</h1>
        <Row>
          <Col sm={12} md={8}>
            <form>
              <FormGroup
                controlId="formBasicText"
                className="mt-5 mb-3"
                style={{
                  paddingBottom: "400px",
                }}
              >
                <ControlLabel
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                >
                  Ingrese el nombre de la categoria
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <FormControl.Feedback />
                <ButtonToolbar>
                  <Button
                    bsStyle="primary"
                    onClick={() => handleAddCategory(categoryName, token)}
                    style={{
                      background: "#ccc",
                      color: "black",
                      marginTop: "20px",
                      border: "1px solid black",
                    }}
                  >
                    Agregar categoria
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default CategoryStore;
