import userReducer from "./userSlice";
import majorReducer from "./majorSlice";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";
import subjectReducer from "./subjectSlice";
import classSectionReducer from "./classSectionSlice";
import classSectionByStudentReducer from "./classSectionByIdStudentSlice";
import classSectionByTeacherReducer from "./classSectionByTeacherSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
	userReducer,
	majorReducer,
	studentReducer,
	teacherReducer,
	subjectReducer,
	classSectionReducer,
	classSectionByStudentReducer,
	classSectionByTeacherReducer,
});
