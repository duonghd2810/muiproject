import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
import { loadingActions } from "./loadingSlice";
export const fetchStudent = createAsyncThunk(
	"student/fetchStudent",
	async (param, { dispatch, getState }) => {
		try {
			dispatch(loadingActions.update(true));
			const response = await request.get("user/student");
			return response.data.result;
		} finally {
			dispatch(loadingActions.update(false));
		}
	}
);
export const studentSlice = createSlice({
	name: "student",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchStudent.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchStudent.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const studentActions = studentSlice.actions;

export default studentSlice.reducer;
