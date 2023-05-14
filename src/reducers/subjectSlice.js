import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "src/utils/request";
import { loadingActions } from "./loadingSlice";
export const fetchSubject = createAsyncThunk(
	"subject/fetchSubject",
	async (param, { dispatch, getState }) => {
		try {
			dispatch(loadingActions.update(true));
			const response = await request.get("subject");
			return response.data;
		} finally {
			dispatch(loadingActions.update(false));
		}
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
