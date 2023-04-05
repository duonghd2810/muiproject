import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Button,
	Container,
	FormControl,
	Input,
	InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomizedGender from "src/theme/overrides/RadioGender";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function UserFormAdd() {
	const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
	const formik = useFormik({
		initialValues: {
			fullName: "",
			dateOfBirth: "",
			phone: "",
			email: "",
			gender: "",
		},
		validationSchema: Yup.object({
			fullName: Yup.string().required("Vui lòng nhập tên sinh viên"),
			dateOfBirth: Yup.date().required("Vui lòng chọn ngày sinh"),
			phone: Yup.string().required("Vui lòng nhập số điện thoại").matches(regexPhone,"Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Vui lòng nhập email")
				.email("Không đúng định dạng email"),
		}),
		onSubmit: (values) => {
			console.log(values);
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
					<InputLabel htmlFor="component-simple">
						Ngày sinh
					</InputLabel>
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
				<CustomizedGender />
				<Button type="submit" size="small" variant="contained">
					Thêm
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default UserFormAdd;
