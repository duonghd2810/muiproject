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
import SubjectPage from "./pages/SubjectPage";
import UpdatePage from "./pages/UpdatePage";
import StudyResultPage from "./pages/StudyResultPage";
import RegistLessonPage from "./pages/RegistLessonPage";
import EnterPointPage from "./pages/EnterPointPage";
import CalendarclPage from "./pages/CalendarclPage";
import SectionClassPage from "./pages/SectionClassPage";
import DetailClassSectionPage from "./pages/DetailClassSectionPage";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import EnterPointFinalPage from "./pages/EnterPointFinalPage";
import CalendarTeacherPage from "./pages/CalendarTeacherPage";

// ----------------------------------------------------------------------

export default function Router() {
	const { data } = useSelector((state) => state.userReducer);
	const routes = useRoutes([
		{
			path: "/",
			element: isEmpty(data) ? (
				<Navigate replace to="/login" />
			) : (
				<DashboardLayout />
			),
			children: [
				{ element: "", index: true },
				{ path: "profile", element: <UpdatePage /> },
				!isEmpty(data) && data.roleSet.includes("ADMIN")
					? { path: "major", element: <MajorPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("ADMIN")
					? { path: "student", element: <StudentPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("ADMIN")
					? { path: "teacher", element: <TeacherPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("ADMIN")
					? { path: "subject", element: <SubjectPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("ADMIN")
					? { path: "sectionclass", element: <SectionClassPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("ADMIN")
					? {
							path: "enterpointfinal",
							element: <EnterPointFinalPage />,
					  }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("STUDENT")
					? { path: "studyresult", element: <StudyResultPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("STUDENT")
					? { path: "registlesson", element: <RegistLessonPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("STUDENT")
					? { path: "calendarcl", element: <CalendarclPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("TEACHER")
					? { path: "enterpoint", element: <EnterPointPage /> }
					: { path: "404", element: <Page404 /> },
				!isEmpty(data) && data.roleSet.includes("TEACHER")
					? { path: "tkbteacher", element: <CalendarTeacherPage /> }
					: { path: "404", element: <Page404 /> },
				{
					path: "enterpoint/:idClass",
					element: <DetailClassSectionPage />,
				},
			],
		},
		{
			path: "login",
			element: isEmpty(data) ? (
				<LoginPage />
			) : (
				<Navigate replace to="/" />
			),
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
