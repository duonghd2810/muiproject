import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Button,
	Container,
	FormControl,
	Input,
	InputLabel,
	TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomizedRadioGender from "src/theme/overrides/RadioGender";
import request from "src/utils/request";
import { useDispatch } from "react-redux";
import { fetchStudent } from "src/reducers/studentSlice";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function UserFormAdd() {
	const dispatch = useDispatch();
	const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
	const formik = useFormik({
		initialValues: {
			fullname: "",
			dateOfBirth: "",
			gender: "",
			address: "",
			phone: "",
			email: "",
		},
		validationSchema: Yup.object({
			fullname: Yup.string().required("Vui lòng nhập tên sinh viên"),
			dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
			address: Yup.string().required("Vui lòng nhập địa chỉ"),
			phone: Yup.string()
				.required("Vui lòng nhập số điện thoại")
				.matches(regexPhone, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Vui lòng nhập email")
				.email("Không đúng định dạng email"),
			gender: Yup.string().required("Vui lòng chọn giới tính"),
		}),
		onSubmit: (values) => {
			console.log(JSON.stringify(values));
			// await request.post("auth/registerstudent", JSON.stringify(values), {
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// });
			// dispatch(fetchStudent());
			formik.handleReset();
		},
	});
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={formik.handleSubmit}>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">Tên</InputLabel>
					<Input
						id="component-simple"
						name="fullname"
						value={formik.values.fullname}
						onChange={formik.handleChange}
					/>
					{formik.errors.fullname && formik.touched.fullname && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.fullname}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							name="dateOfBirth"
							value={formik.values.dateOfBirth || null}
							onChange={(value) => {
								formik.setFieldValue("dateOfBirth", value);
							}}
							renderInput={(params) => <TextField {...params} />}
							label="Ngày sinh"
							format="DD / MM / YYYY"
						/>
					</LocalizationProvider>
					{formik.errors.dateOfBirth &&
						formik.touched.dateOfBirth && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.dateOfBirth}
							</p>
						)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Số điện thoại
					</InputLabel>
					<Input
						id="component-simple"
						name="phone"
						value={formik.values.phone}
						onChange={formik.handleChange}
					/>
					{formik.errors.phone && formik.touched.phone && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.phone}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">Email</InputLabel>
					<Input
						id="component-simple"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
					{formik.errors.email && formik.touched.email && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.email}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<CustomizedRadioGender
						name="gender"
						value={formik.values.gender}
						onChange={formik.handleChange}
					/>
				</FormControl>
				{formik.errors.gender && formik.touched.gender && (
					<p style={{ color: "red", margin: "4px 0" }}>
						{formik.errors.gender}
					</p>
				)}
				<Button type="submit" size="small" variant="contained">
					Thêm
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default UserFormAdd;
