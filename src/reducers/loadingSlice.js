import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
	name: "loading",
	initialState: {
		isLoading: false,
	},
	reducers: {
		update: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
