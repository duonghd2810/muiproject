import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchMajor = createAsyncThunk(
	"major/fetchMajor",
	async (param, { dispatch, getState }) => {
		const response = await request.get("major");
		return response.data.result;
	}
);
export const majorSlice = createSlice({
	name: "major",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchMajor.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchMajor.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const majorActions = majorSlice.actions;

export default majorSlice.reducer;
