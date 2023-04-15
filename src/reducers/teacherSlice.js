import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchTeacher = createAsyncThunk(
	"teacher/fetchTeacher",
	async (param, { dispatch, getState }) => {
		const response = await request.get("user/teacher");
		return response.data.result;
	}
);
export const teacherSlice = createSlice({
	name: "teacher",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchTeacher.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchTeacher.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const studentActions = teacherSlice.actions;

export default teacherSlice.reducer;
