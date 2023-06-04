import { createSlice } from "@reduxjs/toolkit";
import { createBusiness,readBusiness,updateBusiness,deleteBusiness
 } from "../thunks/business-thunk";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    businesses:[],
    createdBusiness: {},
    updatedBusiness: {},
    deletedBusiness: {},
    loading: null,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(createBusiness.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.createdBusiness = action.payload;
      })
      .addCase(createBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(readBusiness.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(readBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload;
      })
      .addCase(readBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteBusiness.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedBusiness = action.payload;
      })
      .addCase(deleteBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      
      .addCase(updateBusiness.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedBusiness = action.payload;
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
});

export default businessSlice.reducer;
