import { createSlice } from "@reduxjs/toolkit";
import {
  bookSlot,
  cancelSlotBookingAttendee,
  createSlot,
  deleteSlot,
  handleFeedback,
  listAllSlots,
  updateSlotStatus,
} from "../thunks/slots-thunk";

const slotSlice = createSlice({
  name: "slot",
  initialState: {
    allSlots: null,
    createdSlot: null,
    updatedSlot: null,
    deletedSlot: null,
    loading: null,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(createSlot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.createdSlot = action.payload;
      })
      .addCase(createSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(bookSlot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedSlot = action.payload;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteSlot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedSlot = action.payload;
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(cancelSlotBookingAttendee.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelSlotBookingAttendee.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedSlot = action.payload;
      })
      .addCase(cancelSlotBookingAttendee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateSlotStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSlotStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedSlot = action.payload;
      })
      .addCase(updateSlotStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(handleFeedback.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedSlot = action.payload;
      })
      .addCase(handleFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(listAllSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listAllSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.allSlots = action.payload;
      })
      .addCase(listAllSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default slotSlice.reducer;
