import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import MajorPage from "./pages/MajorPage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/Login/LoginPage";
import Page404 from "./pages/Page404";
import TeacherPage from "./pages/TeacherPage";
import AdminPage from "./pages/AdminPage";

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
				{ path: "admin", element: <AdminPage /> },
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
