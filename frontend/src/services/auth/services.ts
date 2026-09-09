import routes from "./routes";
import { post, get } from "../index";

const AuthServices = {
  login: async (data: object) => {
    const result = await post(routes.login, data);
    return result;
  },

  signup: async (data: object) => {
    const result = await post(routes.signup, data);
    return result;
  },

  logout: async (data: object) => {
    const result = await post(routes.logout, data);
    return result;
  },

  me: async () => {
    const result = await get(routes.me);
    return result;
  },
};

export default AuthServices;