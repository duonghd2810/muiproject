import userReducer from "./userSlice";
import majorReducer from "./majorSlice";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";
import collegeClassReducer from "./collegeClassSlice";
import subjectReducer from "./subjectSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
	userReducer,
	majorReducer,
	studentReducer,
	teacherReducer,
	collegeClassReducer,
	subjectReducer,
});
