import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchCollegeClass = createAsyncThunk(
	"collegeclass/fetchCollegeClass",
	async (param, { dispatch, getState }) => {
		const response = await request.get("class");
		console.log("🚀 ~ file: collegeClassSlice.js:7 ~ response:", response);

		return response.data;
	}
);
export const collegeClassSlice = createSlice({
	name: "collegeclass",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchCollegeClass.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchCollegeClass.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const majorActions = collegeClassSlice.actions;

export default collegeClassSlice.reducer;
