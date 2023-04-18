import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "src/utils/request";

export const fetchUser = createAsyncThunk(
	"user/fetchUser",
	async (param, { dispatch, getState }) => {
		try {
			const response = await request.post(
				"auth/login",
				JSON.stringify(param),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			request.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.result.token}`;
			return response.data.result;
		} catch {
			alert("Tên đăng nhập hoặc mật khẩu không đúng");
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
