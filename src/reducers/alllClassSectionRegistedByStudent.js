import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
import { loadingActions } from "./loadingSlice";
export const fetchClassSectionRegistedByStudent = createAsyncThunk(
	"classsectionregisted/fetchClassSectionRegistedByStudent",
	async (param, { dispatch, getState }) => {
		try {
			dispatch(loadingActions.update(true));
			const response = await request.get(
				`coursegrade/list-regist/${param}`
			);
			return response.data;
		} finally {
			dispatch(loadingActions.update(false));
		}
	}
);
export const classSectionRegistedByStudentSlice = createSlice({
	name: "classSectionRegistedByStudent",
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
			fetchClassSectionRegistedByStudent.fulfilled,
			(state, action) => {
				state.data = action.payload;
			}
		);
		builder.addCase(
			fetchClassSectionRegistedByStudent.rejected,
			(state, action) => {
				state.data = {};
			}
		);
	},
});

// Action creators are generated for each case reducer function
export const classSectionByStudentActions =
	classSectionRegistedByStudentSlice.actions;

export default classSectionRegistedByStudentSlice.reducer;
