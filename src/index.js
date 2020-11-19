import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/ConfigurationStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
// import PublicRoute from "components/Routers/PublicRoute";
// import PrivateRoute from "components/Routers/PrivateRoute";

import AdminLayout from "layouts/Admin.jsx";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
