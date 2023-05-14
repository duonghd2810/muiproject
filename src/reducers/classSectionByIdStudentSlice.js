import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
import { loadingActions } from "./loadingSlice";
export const fetchClassSectionByStudent = createAsyncThunk(
	"classsection/fetchClassSectionByStudent",
	async (param, { dispatch, getState }) => {
		try {
			dispatch(loadingActions.update(true));
			const response = await request.get(`classsection/${param}`);
			return response.data;
		} finally {
			dispatch(loadingActions.update(false));
		}
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
export const classSectionByStudentActions = classSectionByStudentSlice.actions;

export default classSectionByStudentSlice.reducer;
