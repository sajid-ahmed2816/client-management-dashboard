import Dashboard from "../../pages/dashboard/";
import Client from "../../pages/client";
import Project from "../../pages/project";

const adminRoutes = [
  {
    path: "/dashboard",
    component: <Dashboard />
  },
  {
    path: "/clients",
    component: <Client />
  },
  {
    path: "/projects",
    component: <Project />
  },
];

export default adminRoutes;