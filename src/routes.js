import Dashboard from "views/Dashboard.jsx";
import ProductStore from "./components/ProductStore/ProductStore";
import ProductList from "./components/ProductList/ProductList";
import ProductModifiy from "./components/ProductModifiy/ProductModifiy";
import ProductDelete from "./components/ProductDelete/ProductDelete";
import OrderList from "./components/OrderList/OrderList";
import OrderModify from "./components/OrderModify/OrderModify";
import AdminStore from "./components/AdminStore/AdminStore";
import OrderDelete from "./components/OrderDelete/OrderDelete";
import UserList from "./components/UserList/UserList";
import UserModify from "./components/UserModify/UserModify";
import UserDelete from "./components/UserDelete/UserDelete";
//

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
    component: OrderList,
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
    path: "/UserList",
    name: "Listar usuarios",
    icon: "pe-7s-menu",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/UserModify",
    name: "Editar usuario",
    icon: "pe-7s-pen",
    component: UserModify,
    layout: "/admin",
  },
  {
    path: "/UserDelete",
    name: "Eliminar usuario",
    icon: "pe-7s-delete-user",
    component: UserDelete,
    layout: "/admin",
  },
];

export default dashboardRoutes;
