import userReducer from "./userSlice";
import majorReducer from "./majorSlice";
import studentReducer from "./studentSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
	userReducer,
	majorReducer,
	studentReducer,
});
