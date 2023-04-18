import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import MajorPage from "./pages/MajorPage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import TeacherPage from "./pages/TeacherPage";
import CollegeClass from "./pages/CollegeClass";
import SubjectPage from "./pages/SubjectPage";
import UpdatePage from "./pages/UpdatePage";
import StudyResultPage from "./pages/StudyResultPage";
import RegistLessonPage from "./pages/RegistLessonPage";
import EnterPointPage from "./pages/EnterPointPage";
import CalendarclPage from "./pages/CalendarclPage";
import SectionClassPage from "./pages/SectionClassPage";
import DetailClassPage from "./pages/DetailClassPage";

// ----------------------------------------------------------------------

export default function Router() {
	const routes = useRoutes([
		{
			path: "/",
			element: <DashboardLayout />,
			children: [
				{ element: "", index: true },
				{ path: "major", element: <MajorPage /> },
				{ path: "student", element: <StudentPage /> },
				{ path: "teacher", element: <TeacherPage /> },
				{ path: "collegeclass", element: <CollegeClass /> },
				{ path: "subject", element: <SubjectPage /> },
				{ path: "sectionclass", element: <SectionClassPage /> },
				{ path: "profile", element: <UpdatePage /> },
				{ path: "studyresult", element: <StudyResultPage /> },
				{ path: "registlesson", element: <RegistLessonPage /> },
				{ path: "enterpoint", element: <EnterPointPage /> },
				{ path: "calendarcl", element: <CalendarclPage /> },
				{
					path: "addstudenttoclass",
					element: <DetailClassPage />,
				},
			],
		},
		{
			path: "login",
			element: <LoginPage />,
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to="/" />, index: true },
				{ path: "404", element: <Page404 /> },
				{ path: "*", element: <Navigate to="/404" /> },
			],
		},
		{
			path: "*",
			element: <Navigate to="/404" replace />,
		},
	]);

	return routes;
}
