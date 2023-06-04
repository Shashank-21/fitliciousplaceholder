import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createSlot = createAsyncThunk(
  "slots/create",
  async ({ timeRef, token }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot`,
      {
        timeRef,
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

export const bookSlot = createAsyncThunk(
  "slots/book",
  async ({ slotId, token, purpose }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/book-slot/${slotId}`,
      { purpose },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const deleteSlot = createAsyncThunk(
  "slots/delete",
  async ({ slotId, token, hostCancellationReason }) => {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_AXIOS_BASE_URL
      }/slot/${slotId}?hostCancellationReason=${hostCancellationReason}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const listAllSlots = createAsyncThunk(
  "slots/list-all",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slots`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    return response.data;
  }
);

export const updateSlotStatus = createAsyncThunk(
  "slots/update-status",
  async ({ slotId, status, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/update-slot-status/${slotId}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const cancelSlotBookingAttendee = createAsyncThunk(
  "slots/cancel-booking-attendee",
  async ({ slotId, token, attendeeCancellationReason }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/cancel-slot/${slotId}`,
      { attendeeCancellationReason },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const handleFeedback = createAsyncThunk(
  "slots/feedback",
  async ({ slotId, token, rating, subjectiveFeedback }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot-feedback/${slotId}`,
      { rating, subjectiveFeedback },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
