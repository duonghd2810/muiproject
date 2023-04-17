import userReducer from "./userSlice";
import majorReducer from "./majorSlice";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";
import collegeClassReducer from "./collegeClassSlice";
import subjectReducer from "./subjectSlice";
import classSectionReducer from "./classSectionSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
	userReducer,
	majorReducer,
	studentReducer,
	teacherReducer,
	collegeClassReducer,
	subjectReducer,
	classSectionReducer,
});
