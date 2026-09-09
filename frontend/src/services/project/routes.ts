const routes: {
  createProject: string;
  getProjects: string;
  updateProject: (id: string) => string;
  deleteProject: (id: string) => string;
  getProjectById: (id: string) => string;
} = {
  createProject: "/projects",
  getProjects: "/projects",
  updateProject: (id: string) => `/projects/${id}/update`,
  deleteProject: (id: string) => `/projects/${id}`,
  getProjectById: (id: string) => `/projects/${id}`,
};

export default routes;