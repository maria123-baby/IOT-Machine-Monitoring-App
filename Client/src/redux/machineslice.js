import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchMachines = createAsyncThunk(
  "machines/fetchMachines",
  async () => {
    const response = await fetch("http://localhost:5001/api/machines");
    return await response.json();
  }
);

export const acknowledgeFault = createAsyncThunk(
  "machines/acknowledgeFault",
  async (id) => {
    const response = await fetch(
  `http://localhost:5001/api/machines/${id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "idle",
    }),
  }
);

    return await response.json();
  }
);

const machineSlice = createSlice({
  name: "machines",

  initialState: {
    machines: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.loading = false;
        state.machines = action.payload;
      })

      .addCase(fetchMachines.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to fetch machines";
      })

      .addCase(acknowledgeFault.fulfilled, (state, action) => {
        const index = state.machines.findIndex(
          (m) => m.id === action.payload.id
        );

        if (index !== -1) {
          state.machines[index] = action.payload;
        }
      });
  },
});

export default machineSlice.reducer;