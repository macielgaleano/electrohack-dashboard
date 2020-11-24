import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ProductDelete.css";

const ProductDelete = ({ slug, getProducts }) => {
  const token = useSelector((state) => state.admin.token);
  const [products, setProducts] = useState(null);

  function deleteItem(slug, token) {
    console.log(slug);
    axios
      .delete("https://electrohack-server.vercel.app/api/admin/productos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { slug: slug },
      })
      .then((res) => {
        console.log(res);
        const newsProducts = products.filter((product) => product.slug !== slug);
        setProducts(newsProducts);
        getProducts(newsProducts);
      });
  }

  useEffect(() => {
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;

  return (
    <>
      <OverlayTrigger placement="top" overlay={remove}>
        <Button
          bsStyle="danger"
          simple
          type="button"
          bsSize="xs"
          onClick={() => deleteItem(slug, token)}
        >
          <i className="fa fa-times" onClick={() => deleteItem(slug, token)} />
        </Button>
      </OverlayTrigger>
    </>
  );
};

export default ProductDelete;
