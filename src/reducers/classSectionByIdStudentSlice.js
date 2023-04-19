import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchClassSectionByStudent = createAsyncThunk(
	"classsection/fetchClassSectionByStudent",
	async (param, { dispatch, getState }) => {
		const response = await request.get(`classsection/${param}`);
		return response.data;
	}
);
export const classSectionByStudentSlice = createSlice({
	name: "classsectionbystudent",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(
			fetchClassSectionByStudent.fulfilled,
			(state, action) => {
				state.data = action.payload;
			}
		);
		builder.addCase(
			fetchClassSectionByStudent.rejected,
			(state, action) => {
				state.data = {};
			}
		);
	},
});

// Action creators are generated for each case reducer function
export const majorActions = classSectionByStudentSlice.actions;

export default classSectionByStudentSlice.reducer;
