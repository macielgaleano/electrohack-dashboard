import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.jsx";
import { quantity } from "chartist";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityOrders: 0,
      quantityProductsState: 0,
      sum_count: 0,
      userQuantity: 0,
      data_sales: {
        labels: [],
        series: [[]],
      },
      dataPie: {
        labels: [],
        series: [],
      },
    };
  }
  componentDidMount() {
    let products_aux = [];
    axios.get("https://electrohack-server.vercel.app/productos").then((res) => {
      this.setState({ quantityProductsState: res.data.length });
    });
    axios
      .get("https://electrohack-server.vercel.app/api/usuarios", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjU4M2I5NGRmZjA4OGYzZTdmNzI4ZSIsImZpcnN0bmFtZSI6InJvb3QiLCJsYXN0bmFtZSI6InJvb3QiLCJpYXQiOjE2MDU3OTc5NjF9.bysGz5ZH2rTQvVNJf18ssogrJy54TNZwmppQ-QDwJRA",
        },
      })
      .then((res) => {
        this.setState({ userQuantity: res.data.length });
      });
    axios
      .get("https://electrohack-server.vercel.app/api/pedidos/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjU4M2I5NGRmZjA4OGYzZTdmNzI4ZSIsImZpcnN0bmFtZSI6InJvb3QiLCJsYXN0bmFtZSI6InJvb3QiLCJpYXQiOjE2MDU3OTc5NjF9.bysGz5ZH2rTQvVNJf18ssogrJy54TNZwmppQ-QDwJRA",
        },
      })
      .then((res) => {
        let aux_table = [];
        res.data.map((el, index) => {
          if (aux_table.length === 0) {
            aux_table.push({ state: el.state, quan: 1 });
          }
          aux_table.forEach((tab) => {
            if (el.state === tab.state) {
              tab.quan = tab.quan + 1;
            } else if (aux_table.length === index - 1) {
              aux_table.push({ state: el.state, quan: 1 });
            }
          });
        });
        let total = 0;
        aux_table.map((el) => {
          total = total + el.quan;
        });

        aux_table.map((el) => {
          console.log(el);
          this.setState({
            dataPie: {
              labels: [...this.state.dataPie.labels, (el.quan * 100) / total + "%"],
              series: [...this.state.dataPie.series, (el.quan * 100) / total],
            },
          });
        });

        this.setState({ quantityOrders: res.data.length });
        res.data.forEach((el) => {
          products_aux = [...products_aux, ...el.products];
        });

        products_aux.forEach((el) => {
          this.setState({ sum_count: this.state.sum_count + el.price * el.quantity });
        });
      });
    axios.get("https://electrohack-server.vercel.app/ordenes/mes").then((res) => {
      res.data.forEach((el) => {
        if (!this.state.data_sales.series) {
          this.setState({
            data_sales: {
              labels: [...this.state.data_sales.labels, el._id],
              series: [[...this.state.data_sales.series, el.id]],
            },
          });
        } else {
          this.setState({
            data_sales: {
              labels: [el._id],
              series: [[el.count]],
            },
          });
        }
      });
    });
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Productos"
                statsValue={this.state.quantityProductsState}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Ventas"
                statsValue={this.state.sum_count}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-box1 text-danger" />}
                statsText="Ordenes"
                statsValue={this.state.quantityOrders}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-user text-info" />}
                statsText="Usuarios"
                statsValue={this.state.userQuantity}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Productos enviados por cantidad"
                // category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph data={this.state.data_sales} type="Line" />
                  </div>
                }
                legend={<div className="legend">{this.createLegend(legendSales)}</div>}
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Estado de ordenes"
                stats="Campaign sent 2 days ago"
                content={
                  <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                    <ChartistGraph data={this.state.dataPie} type="Pie" />
                  </div>
                }
                legend={<div className="legend">{this.createLegend(legendPie)}</div>}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="Cantidad de ingresos por dia"
                // category="All products including Taxes"
                stats="Updated now"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={<div className="legend">{this.createLegend(legendBar)}</div>}
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Desarrollo backend and frontend"
                stats="Updated now"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
