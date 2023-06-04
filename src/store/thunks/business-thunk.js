import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createBusiness = createAsyncThunk(
  "business/add",
  async ({ businessDetails, token }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/business`,
      {
        ...businessDetails,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const readBusiness = createAsyncThunk(
  "business/read",
  async ({ userId, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/business?userId=${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const updateBusiness = createAsyncThunk(
  "business/update",
  async ({ businessDetails, token, businessId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/business/${businessId}`,
      {
        ...businessDetails,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const deleteBusiness = createAsyncThunk(
  "business/delete",
  async ({ token, businessId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/business/${businessId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

