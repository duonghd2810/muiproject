import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchSubject = createAsyncThunk(
	"subject/fetchSubject",
	async (param, { dispatch, getState }) => {
		const response = await request.get("subject");
		return response.data.result;
	}
);
export const subjectSlice = createSlice({
	name: "subject",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchSubject.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchSubject.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const majorActions = subjectSlice.actions;

export default subjectSlice.reducer;
