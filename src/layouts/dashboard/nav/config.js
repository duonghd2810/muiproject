// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 1, height: 1 }}
	/>
);
const navConfig = [
	{
		title: "Quản lý ngành học",
		path: "/major",
		icon: icon("ic_analytics"),
		role: "ADMIN",
	},
	{
		title: "Quản lý môn học",
		path: "/subject",
		icon: icon("ic_subject"),
		role: "ADMIN",
	},
	{
		title: "Quản lý lớp học phần",
		path: "/sectionclass",
		icon: icon("ic_sectionclass"),
		role: "ADMIN",
	},
	{
		title: "Quản lý sinh viên",
		path: "/student",
		icon: icon("ic_user"),
		role: "ADMIN",
	},
	{
		title: "Quản lý giáo viên",
		path: "/teacher",
		icon: icon("ic_user"),
		role: "ADMIN",
	},
	{
		title: "Đăng ký học phần",
		path: "/registlesson",
		icon: icon("ic_key"),
		role: "STUDENT",
	},
	{
		title: "Thời khóa biểu",
		path: "/calendarcl",
		icon: icon("ic_calendar"),
		role: "STUDENT",
	},
	{
		title: "Kết quả học tập",
		path: "/studyresult",
		icon: icon("ic_stydyresult"),
		role: "STUDENT",
	},
	{
		title: "Nhập điểm học kì",
		path: "/enterpointfinal",
		icon: icon("ic_point"),
		role: "ADMIN",
	},
	{
		title: "Xem lịch dạy",
		path: "/tkbteacher",
		icon: icon("ic_calendar"),
		role: "TEACHER",
	},
	{
		title: "Nhập điểm",
		path: "/enterpoint",
		icon: icon("ic_point"),
		role: "TEACHER",
	},
	// {
	// 	title: "login",
	// 	path: "/login",
	// 	icon: icon("ic_lock"),
	// },
	// {
	// 	title: "Not found",
	// 	path: "/404",
	// 	icon: icon("ic_disabled"),
	// },
];

export default navConfig;
