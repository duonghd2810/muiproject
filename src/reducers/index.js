import userReducer from "./userSlice";
import majorReducer from "./majorSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
	userReducer,
	majorReducer,
});
