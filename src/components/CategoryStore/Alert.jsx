import React from "react";
import { Alert } from "@material-ui/lab";

export default function CategoryAlert({ show, setShow, text }) {
  if (show) {
    return <Alert severity="info">{text}</Alert>;
  } else {
    return <></>;
  }
}
