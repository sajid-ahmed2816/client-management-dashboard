const routes: {
  createClient: string;
  getClients: string;
  updateClient: (id: string) => string;
  deleteClient: (id: string) => string;
  getClientById: (id: string) => string;
} = {
  createClient: "/clients",
  getClients: "/clients",
  updateClient: (id: string) => `/clients/${id}`,
  deleteClient: (id: string) => `/clients/${id}`,
  getClientById: (id: string) => `/clients/${id}`,
};

export default routes;