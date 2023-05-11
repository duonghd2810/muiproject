import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "src/utils/request";
import { loadingActions } from "./loadingSlice";

export const fetchUser = createAsyncThunk(
	"user/fetchUser",
	async (param, { dispatch, getState }) => {
		try {
			dispatch(loadingActions.update(true));
			const response = await request.post(
				"auth/login",
				JSON.stringify(param),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			localStorage.setItem(
				"token",
				`Bearer ${response.data.result.token}`
			);
			return response.data.result;
		} catch (error) {
			alert(error.response.data.message);
		} finally {
			dispatch(loadingActions.update(false));
		}
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
