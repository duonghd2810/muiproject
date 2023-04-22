import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
export const fetchStudentInclassSection = createAsyncThunk(
	"studentInclasssection/fetchStudentInclassSection",
	async (param, { dispatch, getState }) => {
		const response = await request.get(`coursegrade/detailclass/${param}`);
		return response.data;
	}
);
export const studentInclassSectionSlice = createSlice({
	name: "studentInclasssection",
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
			fetchStudentInclassSection.fulfilled,
			(state, action) => {
				state.data = action.payload;
			}
		);
		builder.addCase(
			fetchStudentInclassSection.rejected,
			(state, action) => {
				state.data = {};
			}
		);
	},
});

// Action creators are generated for each case reducer function
export const studentInclassSectionActions = studentInclassSectionSlice.actions;

export default studentInclassSectionSlice.reducer;
