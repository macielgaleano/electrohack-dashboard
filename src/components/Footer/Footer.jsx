import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#pablo">ElectroHack Ecomerce</a>
              </li>
              <li>
                <a href="#pablo">Sobre nosotros</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()} , Sin comentarios.
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
