import Dashboard from "views/Dashboard.jsx";
import ProductStore from "./components/ProductStore/ProductStore";
import ProductList from "./components/ProductList/ProductList";
import ProductModifiy from "./components/ProductModifiy/ProductModifiy";
import ProductDelete from "./components/ProductDelete/ProductDelete";
import OrderList from "./components/OrderList/OrderList";
import AdminStore from "./components/AdminStore/AdminStore";
import CategoryStore from "./components/CategoryStore/CategoryStore";
// import CategoryList from "./components/CategoryList/CategoryList";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";
import Admin from "./components/Admin/Admin";

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
    path: "/CategoryStore",
    name: "Crear categoria",
    icon: "pe-7s-plus",
    component: CategoryStore,
    layout: "/admin",
  },
  {
    path: "/Category",
    name: "Categoria",
    icon: "pe-7s-ticket",
    component: Category,
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
    path: "/Product",
    name: "Producto",
    icon: "pe-7s-box1",
    component: Product,
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
    upgrade: true,
    path: "/AdminStore",
    name: "Crear admin",
    icon: "pe-7s-plus",
    component: AdminStore,
    layout: "/admin",
  },
  {
    path: "/admin",
    name: "Admin",
    icon: "pe-7s-id",
    component: Admin,
    layout: "/admin",
  },
];

export default dashboardRoutes;
