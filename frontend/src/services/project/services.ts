import routes from "./routes";
import { post, get, patch, deleted } from "../index";

const ProjectServices = {
  createProject: async (data: FormData) => {
    const result = await post(routes.createProject, data);
    return result;
  },

  getProjects: async (params?: object) => {
    const result = await get(routes.getProjects, params);
    return result;
  },

  getProjectById: async (id: string) => {
    const result = await get(routes.getProjectById(id));
    return result;
  },

  updateProject: async (data: FormData, id: string) => {
    const result = await patch(routes.updateProject(id), data);
    return result;
  },

  deleteProject: async (id: string) => {
    const result = await deleted(routes.deleteProject(id));
    return result;
  },
};

export default ProjectServices;