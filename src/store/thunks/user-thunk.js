import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoogleUser = createAsyncThunk(
  "users/google",
  async (access_token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/fetch-user-data`,
      { params: { access_token } }
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ token, phone, dob, location }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/update-user`,
      { phone, dob, location },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);

export const approveUserRole = createAsyncThunk(
  "user/approve-role",
  async ({ userId, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/approve-role/${userId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/view-all",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/users`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
