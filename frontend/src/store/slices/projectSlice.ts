import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProjectServices from "../../services/project/services";
import type { ClientType } from "../slices/clientSlice";

export interface FileType {
  path: string;
  name: string;
  url: string;
  resourceType: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  status: string;
  clientId: string;
  client: ClientType;
  files: FileType[]
};

interface ProjectState {
  projects: ProjectType[];
  loading: boolean;
  error: string | null;
};

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

export const createProject = createAsyncThunk<
  ProjectType,
  FormData,
  { rejectValue: string }
>("projects/createProject", async (data, { rejectWithValue }) => {
  try {
    const response = await ProjectServices.createProject(data);

    return response.data.project
  } catch (error) {
    return rejectWithValue(
      typeof error === "string"
        ? error
        : "Unable to create"
    );
  };
});

export const getProjects = createAsyncThunk<
  ProjectType[],
  { search?: string; status?: string } | undefined,
  { rejectValue: string }
>("projects/getProjects", async ({ search = "", status = "" } = {}, { rejectWithValue }) => {
  try {
    const params = { search: search, status: status }
    const response = await ProjectServices.getProjects(params);
    return response.data.projects;
  } catch (error) {
    return rejectWithValue(
      typeof error === "string"
        ? error
        : "Unable to get projects"
    );
  }
});

export const updateProject = createAsyncThunk<
  ProjectType,
  { id: string; data: FormData },
  { rejectValue: string }
>("projects/updateProject", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await ProjectServices.updateProject(data, id);

    return response.data.project
  } catch (error) {
    return rejectWithValue(
      typeof error === "string"
        ? error
        : "Unable to update"
    );
  };
});

export const deleteProject = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("projects/deleteProject", async (id, { rejectWithValue }) => {
  try {
    const response = await ProjectServices.deleteProject(id);
    return { message: response.message, id: response.data.project.id };
  } catch (error) {
    return rejectWithValue(
      typeof error === "string" ? error : "Unable to delete"
    );
  }
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProject: (state) => {
      state.projects = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to create"
      })

      //get projects
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to get projects"
      })

      //update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.projects.findIndex(
          (client) => client.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to create"
      })

      //delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload.id
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to delete";
      });
  },
})

export const { clearProject } = projectSlice.actions;

export default projectSlice.reducer;