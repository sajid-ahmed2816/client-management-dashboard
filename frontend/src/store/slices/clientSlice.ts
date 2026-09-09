import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClientServices from "../../services/client/services";

export interface ClientType {
  id: string;
  name: string;
  email: string;
  company: string;
};

interface ClientState {
  clients: ClientType[];
  loading: boolean;
  error: string | null;
};

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

export const createClient = createAsyncThunk<
  ClientType,
  { name: string; email: string; company: string; },
  { rejectValue: string }
>("clients/createClient", async (data, { rejectWithValue }) => {
  try {
    const response = await ClientServices.createClient(data);

    return response.data.client
  } catch (error) {
    return rejectWithValue(
      typeof error === "string"
        ? error
        : "Unable to create"
    );
  };
});

export const getClients = createAsyncThunk<
  ClientType[],
  void,
  { rejectValue: string }
>("clients/getClients", async (_, { rejectWithValue }) => {
  try {
    const response = await ClientServices.getClients();

    return response.data.clients;
  } catch (error) {
    return rejectWithValue(
      typeof error === "string"
        ? error
        : "Unable to get clients"
    );
  }
});

export const updateClient = createAsyncThunk<
  ClientType,
  { id: string; name: string; email: string; company: string; },
  { rejectValue: string }
>("clients/updateClient", async (data, { rejectWithValue }) => {
  try {
    const response = await ClientServices.updateClient(data, data.id);

    return response.data.client
  } catch (error) {
    return rejectWithValue(
      typeof error === "string"
        ? error
        : "Unable to update"
    );
  };
});

export const deleteClient = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("clients/deleteClient", async (id, { rejectWithValue }) => {
  try {
    const response = await ClientServices.deleteClient(id);
    return { message: response.message, id: response.data.client.id };
  } catch (error) {
    return rejectWithValue(
      typeof error === "string" ? error : "Unable to delete"
    );
  }
});

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clearClient: (state) => {
      state.clients = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //create client
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.clients.unshift(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to create client"
      })

      //get clients
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
        state.error = null;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to get clients"
      })

      //update client
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.clients.findIndex(
          (client) => client.id === action.payload.id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to create client"
      })

      //delete client
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.clients = state.clients.filter(
          (client) => client.id !== action.payload.id
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to delete";
      });
  },
})

export const { clearClient } = clientSlice.actions;

export default clientSlice.reducer;