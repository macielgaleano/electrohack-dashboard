import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

  let total = 0;

  return (
    <div className="container">
      <h2 className="text-center">Todas las órdenes</h2>
      {orders &&
        orders.map((order, index) => {
          if (index < 38) {
            return (
              <div className="box" key={index}>
                <p>
                  <strong>
                    Nombre del cliente: {order.user[0].firstname} {order.user[0].lastname}{" "}
                  </strong>
                </p>

                {order.products.map((product, index) => {
                  return (
                    <p key={index}>
                      <strong>Articulo: </strong>
                      {product.name} - <strong>Cantidad: </strong>
                      {product.quantity}
                      {(total = total + product.quantity * product.price)}
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
                        <strong>TOTAL:</strong> ${Math.round(total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default OrderList;
