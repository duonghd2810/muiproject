import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchClassSection = createAsyncThunk(
  "classsection/fetchClassSection",
  async (param, { dispatch, getState }) => {
    const response = await request.get("classsection");
    return response.data;
  }
);
export const classSectionSlice = createSlice({
  name: "classsection",
  initialState: {
    data: [],
    mappingData: {},
    mappingTeacher: {},
  },
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchClassSection.fulfilled, (state, action) => {
      state.data = action.payload;
      state.mappingData = action.payload.reduce(
        (val, { id_classroom, id_day, lesson }) => {
          const key = [id_classroom, id_day].join("-");
          if (lesson) {
            val[key] = val[key] || [];
            val[key].push(...lesson.split(","));
            // val[key].sort();
          }
          return val;
        },
        {}
      );
      state.mappingTeacher = action.payload.reduce(
        (val, { id_day, id_teacher, lesson }) => {
          const key = [id_day, id_teacher].join("-");
          if (lesson) {
            val[key] = val[key] || [];
            val[key].push(...lesson.split(","));
            // val[key].sort();
          }
          return val;
        },
        {}
      );
    });
    builder.addCase(fetchClassSection.rejected, (state, action) => {
      state.data = {};
    });
  },
});

// Action creators are generated for each case reducer function
export const classSectionActions = classSectionSlice.actions;

export default classSectionSlice.reducer;
