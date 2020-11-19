import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Row, Col, Table } from "react-bootstrap";
import "./Orders.css";

const OrderList = () => {
  const store = useSelector((state) => state);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    store.admin.token &&
      fetch(`https://electrohack-server.vercel.app/api/admin/pedidos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.admin.token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setOrders(data);
        });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Todas las órdenes</h2>
      {orders.map((order) => {
        return (
          <div className="box">
            <p>
              <strong>Nombre del cliente: </strong>
              {order.user[0].firstname} {order.user[0].lastname}
            </p>
            {order.products.map((product) => {
              return (
                <p>
                  <strong>Articulo: </strong>
                  {product.name} - <strong>Cantidad: </strong>
                  {product.quantity}
                </p>
              );
            })}
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Estado:</strong> {order.state}
                </p>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-end pr-3">
                  <p>
                    <strong>TOTAL:</strong> ${Math.round(order.total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
