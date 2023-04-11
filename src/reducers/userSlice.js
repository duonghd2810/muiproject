import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
	"user/fetchUser",
	async (param, { dispatch, getState }) => {
		console.log("param", param);
		console.log("getState", getState());
		const response = await Promise.resolve({
			token:
				Date.now().toString(36) +
				Math.random().toString(36).substring(2),
		});
		return response;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		data: {},
	},
	reducers: {
		update: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.data = {};
		});
	},
});

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;

export default userSlice.reducer;
