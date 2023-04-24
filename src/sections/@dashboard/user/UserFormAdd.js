import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Button,
	Container,
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomizedRadioGender from "src/theme/overrides/RadioGender";
import request from "src/utils/request";
import { useDispatch } from "react-redux";
import { fetchStudent } from "src/reducers/studentSlice";
import { fetchTeacher } from "src/reducers/teacherSlice";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function UserFormAdd({ type, dataSelect }) {
	const dispatch = useDispatch();
	const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
	const formik = useFormik({
		initialValues: {
			id_major: null,
			fullName: "",
			dateOfBirth: "",
			gender: "",
			address: "",
			phone: "",
			email: "",
		},
		validationSchema: Yup.object({
			id_major: Yup.number().required("Vui lòng chọn ngành học"),
			fullName: Yup.string().required("Vui lòng nhập tên sinh viên"),
			dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
			address: Yup.string(),
			phone: Yup.string()
				.required("Vui lòng nhập số điện thoại")
				.matches(regexPhone, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Vui lòng nhập email")
				.email("Không đúng định dạng email"),
			gender: Yup.string().required("Vui lòng chọn giới tính"),
		}),
		onSubmit: async (values) => {
			if (type === "student") {
				await request.post(
					"auth/registerstudent",
					JSON.stringify(values),
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				dispatch(fetchStudent());
			}
			if (type === "teacher") {
				await request.post(
					"auth/registerteacher",
					JSON.stringify(values),
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				dispatch(fetchTeacher());
			}
			formik.handleReset();
		},
	});
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={formik.handleSubmit}>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel id="demo-simple-select-label">Ngành</InputLabel>
					<Select
						label="Ngành"
						labelId="demo-simple-select-label"
						name="id_major"
						onChange={formik.handleChange}
						value={formik.values.id_major || null}
					>
						{dataSelect.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.majorName}
							</MenuItem>
						))}
					</Select>
					{formik.errors.id_major && formik.touched.id_major && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.id_major}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">Tên</InputLabel>
					<Input
						id="component-simple"
						name="fullName"
						value={formik.values.fullName}
						onChange={formik.handleChange}
					/>
					{formik.errors.fullName && formik.touched.fullName && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.fullName}
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
					<InputLabel htmlFor="component-simple">Địa chỉ</InputLabel>
					<Input
						id="component-simple"
						name="address"
						value={formik.values.address}
						onChange={formik.handleChange}
					/>
					{formik.errors.address && formik.touched.address && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.address}
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
