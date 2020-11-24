import React from "react";
import { Alert, Button } from "react-bootstrap";

export default function CategoryAlert({ show, setShow }) {
  if (show) {
    return (
      <Alert style={{ marginTop: "10px" }} bsStyle="warning">
        La categoría fue creada exitosamente
        <Button onClick={() => setShow(false)}>Close</Button>
      </Alert>
    );
  } else {
    return <></>;
  }
}
