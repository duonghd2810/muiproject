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
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchClassSection.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchClassSection.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const majorActions = classSectionSlice.actions;

export default classSectionSlice.reducer;
