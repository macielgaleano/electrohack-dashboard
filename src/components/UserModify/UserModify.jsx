import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function UserModify() {
  return (
    <Grid>
      <Row key={""}>
        <Col md={5}>{""}</Col>
        <Col md={3}>{""}</Col>
        <Col md={2}>
          <Button bsStyle="success">Editar</Button>
        </Col>
        <Col md={2}>
          <Button
            bsStyle="danger"
            /* onClick={() => deleteItem(product.slug, token)} */
          >
            Eliminar
          </Button>
        </Col>
      </Row>
    </Grid>
  );
}

export default UserModify;
