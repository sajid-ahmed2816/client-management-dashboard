import routes from "./routes";
import { post, get, deleted } from "../index";

const ClientServices = {
  createClient: async (data: FormData) => {
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

  updateClient: async (data: FormData, id: string) => {
    const result = await post(routes.updateClient(id), data);
    return result;
  },

  deleteClient: async (id: string) => {
    const result = await deleted(routes.deleteClient(id));
    return result;
  },
};

export default ClientServices;