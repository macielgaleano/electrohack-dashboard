import Dashboard from "views/Dashboard.jsx";
import ProductStore from "./components/ProductStore/ProductStore";
import ProductList from "./components/ProductList/ProductList";
import ProductModifiy from "./components/ProductModifiy/ProductModifiy";
import ProductDelete from "./components/ProductDelete/ProductDelete";
import OrdenList from "./components/OrdenList";
import OrderModify from "./components/OrderModify/OrderModify";
import AdminStore from "./components/AdminStore";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },
  {
    upgrade: true,
    path: "/ProductStore",
    name: "Crear producto",
    icon: "pe-7s-plus",
    component: ProductStore,
    layout: "/admin",
  },
  {
    path: "/ProductList",
    name: "Listar productos",
    icon: "pe-7s-menu",
    component: ProductList,
    layout: "/admin",
  },
  {
    path: "/ProductModifiy",
    name: "Editar producto",
    icon: "pe-7s-pen",
    component: ProductModifiy,
    layout: "/admin",
  },
  {
    path: "/ProductDelete",
    name: "Eliminar producto",
    icon: "pe-7s-close-circle",
    component: ProductDelete,
    layout: "/admin",
  },
  {
    upgrade: true,
    path: "/OrdenList",
    name: "Listar ordenes",
    icon: "pe-7s-menu",
    component: OrdenList,
    layout: "/admin",
  },
  {
    path: "/OrderModify",
    name: "Editar orden",
    icon: "pe-7s-pen",
    component: OrderModify,
    layout: "/admin",
  },
  {
    path: "/OrderDelete",
    name: "Eliminar orden",
    icon: "pe-7s-close-circle",
    component: OrderDelete,
    layout: "/admin",
  },
  {
    upgrade: true,
    path: "/AdminStore",
    name: "Crear administrador",
    icon: "pe-7s-plus",
    component: AdminStore,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Listar usuarios",
    icon: "pe-7s-menu",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Editar usuario",
    icon: "pe-7s-pen",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Eliminar usuario",
    icon: "pe-7s-delete-user",
    component: Dashboard,
    layout: "/admin",
  },
];

export default dashboardRoutes;
