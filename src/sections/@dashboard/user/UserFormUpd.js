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
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import request from "src/utils/request";
import { fetchStudent } from "src/reducers/studentSlice";
import { fetchTeacher } from "src/reducers/teacherSlice";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function UserFormUpd(props) {
	const dispatch = useDispatch();
	const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
	const { data, setOpen, type } = props;

	const formik = useFormik({
		initialValues: {
			fullName: data.fullName,
			dateOfBirth: dayjs(data.dateOfBirth),
			phone: data.phone,
			address: data.address,
			email: data.email,
			gender: data.gender,
		},
		validationSchema: Yup.object({
			fullName: Yup.string().required("Vui lòng nhập tên sinh viên"),
			dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
			address: Yup.string(),
			phone: Yup.string()
				.required("Vui lòng nhập số điện thoại")
				.matches(regexPhone, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Vui lòng nhập email")
				.email("Không đúng định dạng email"),
		}),
		onSubmit: async (values) => {
			await request.patch(`user/${data.id}`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (type === "student") {
				dispatch(fetchStudent());
			}
			if (type === "teacher") {
				dispatch(fetchTeacher());
			}
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
							defaultValue={formik.values.dateOfBirth || null}
							onChange={(value) => {
								formik.setFieldValue(
									"dateOfBirth",
									Date.parse(value)
								);
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
						value={formik.gender}
						onChange={formik.handleChange}
					/>
				</FormControl>
				<Button
					type="submit"
					size="small"
					variant="contained"
					onClick={() => setOpen(false)}
				>
					Cập nhật
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default UserFormUpd;
