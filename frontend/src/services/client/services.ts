import routes from "./routes";
import { post, get, patch, deleted } from "../index";

const ClientServices = {
  createClient: async (data: object) => {
    const result = await post(routes.createClient, data);
    return result;
  },

  getClients: async (params?: object) => {
    const result = await get(routes.getClients, params);
    return result;
  },

  getClientById: async (id: string) => {
    const result = await get(routes.getClientById(id));
    return result;
  },

  updateClient: async (data: object, id: string) => {
    const result = await patch(routes.updateClient(id), data);
    return result;
  },

  deleteClient: async (id: string) => {
    const result = await deleted(routes.deleteClient(id));
    return result;
  },
};

export default ClientServices;