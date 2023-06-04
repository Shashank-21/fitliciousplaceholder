import { createSlice } from "@reduxjs/toolkit";
import {
  approveUserRole,
  fetchAllUsers,
  fetchGoogleUser,
  updateUser,
} from "../thunks/user-thunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    updatedUser: null,
    loading: null,
    error: null,
    allUsers: null,
    locations: [
      "Edmonton, Canada",
      "Toronto, Canada",
      "Vancouver, Canada",
      "India",
    ],
  },
  reducers: {
    loginUser(state, action) {
      state.currentUser = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchGoogleUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGoogleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchGoogleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(approveUserRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approveUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
      })
      .addCase(approveUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
