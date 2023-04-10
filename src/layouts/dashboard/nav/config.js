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
	},
	{
		title: "Quản lý lớp chính quy",
		path: "/collegeclass",
		icon: icon("ic_class"),
	},
	{
		title: "Quản lý môn học",
		path: "/subject",
		icon: icon("ic_subject"),
	},
	{
		title: "Quản lý sinh viên",
		path: "/student",
		icon: icon("ic_user"),
	},
	{
		title: "Thời khóa biểu",
		path: "/calendarcl",
		icon: icon("ic_calendar"),
	},
	{
		title: "Kết quả học tập",
		path: "/studyresult",
		icon: icon("ic_stydyresult"),
	},
	{
		title: "Đăng ký học phần",
		path: "/registlesson",
		icon: icon("ic_key"),
	},
	{
		title: "Nhập điểm",
		path: "/enterpoint",
		icon: icon("ic_point"),
	},
	{
		title: "Quản lý giáo viên",
		path: "/teacher",
		icon: icon("ic_user"),
	},
	{
		title: "login",
		path: "/login",
		icon: icon("ic_lock"),
	},
	{
		title: "Not found",
		path: "/404",
		icon: icon("ic_disabled"),
	},
];

export default navConfig;
