import Login from "../../pages/auth/login";
import Signup from "../../pages/auth/signup";

const publicRoutes = [
  {
    path: "/login",
    component: <Login />
  },
  {
    path: "/sign-up",
    component: <Signup />
  }
];

export default publicRoutes