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
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CategoryStore = () => {
  const [nameCategory, setNameCategory] = useState("hola");
  const store = useSelector((state) => state);
  const history = useHistory();
  let addCategory = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/api/admin/categorias",
        {
          name: nameCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.admin.token}`,
          },
        }
      )
      .then((admin) => {
        console.log(admin);
        history.push("/admin/CategoryList");
      });
  };

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
                <ControlLabel style={{ marginTop: "30px", marginBottom: "20px" }}>
                  Ingrese el nombre de la categoria
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter text"
                  onChange={(e) => setNameCategory(e.target.value)}
                />
                <FormControl.Feedback />
                <ButtonToolbar>
                  <Button
                    bsStyle="primary"
                    onClick={addCategory}
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
