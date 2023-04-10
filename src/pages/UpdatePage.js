import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Button,
	Card,
	CardActionArea,
	CardMedia,
	Container,
	FormControl,
	Input,
	InputLabel,
	Stack,
	TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Helmet } from "react-helmet-async";
const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function UpdatePage() {
	const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
	const formik = useFormik({
		initialValues: {
			avatar: "",
			dateOfBirth: "",
			phone: "",
			email: "",
			gender: "Nam",
		},
		validationSchema: Yup.object({
			avatar: Yup.string(),
			dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
			phone: Yup.string()
				.required("Vui lòng nhập số điện thoại")
				.matches(regexPhone, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Vui lòng nhập email")
				.email("Không đúng định dạng email"),
		}),
		onSubmit: (values) => {
			console.log(JSON.parse(JSON.stringify(values)));
			formik.handleReset();
		},
	});
	return (
		<>
			<Helmet>
				<title>Quản lý giáo viên</title>
			</Helmet>

			<Container maxWidth="sm">
				<GlobalForm onSubmit={formik.handleSubmit}>
					<FormControl style={{ margin: "12px 0" }}>
						<InputLabel htmlFor="component-simple">Tên</InputLabel>
						<Input
							id="component-simple"
							name="fullName"
							value=""
							size="small"
							readOnly
						/>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								name="dateOfBirth"
								value={formik.values.dateOfBirth || null}
								onChange={(value) => {
									formik.setFieldValue("dateOfBirth", value);
								}}
								size="small"
								renderInput={(params) => (
									<TextField {...params} />
								)}
								label="Ngày sinh"
								format="DD / MM / YYYY"
								readOnly
							/>
						</LocalizationProvider>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<InputLabel htmlFor="component-simple">
							Giới tính
						</InputLabel>
						<Input
							id="component-simple"
							name="gender"
							value=""
							size="small"
							readOnly
						/>
					</FormControl>
					{/* <FormControl style={{ margin: "12px 0" }}>
					<Stack direction="row" alignItems="center" spacing={2}>
						<TextField
							id="outlined-full-width"
							label="Ảnh"
							style={{ margin: 8 }}
							name="upload-photo"
							type="file"
							size="small"
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
							onChange={(e) => {
								formik.setFieldValue(
									"avatar",
									URL.createObjectURL(e.target.files[0])
								);
							}}
						/>
					</Stack>
					{!formik.errors.avatar && (
						<Card style={{ maxWidth: "350px" }}>
							<CardActionArea>
								<CardMedia
									component="img"
									alt="Ảnh"
									height="140"
									image={formik.avatar}
								/>
							</CardActionArea>
						</Card>
					)}
				</FormControl> */}
					<FormControl style={{ margin: "12px 0" }}>
						<InputLabel htmlFor="component-simple">
							Địa chỉ
						</InputLabel>
						<Input
							id="component-simple"
							name="phone"
							value={formik.values.address}
							onChange={formik.handleChange}
							size="small"
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
							size="small"
						/>
						{formik.errors.phone && formik.touched.phone && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.phone}
							</p>
						)}
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<InputLabel htmlFor="component-simple">
							Email
						</InputLabel>
						<Input
							id="component-simple"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							size="small"
						/>
						{formik.errors.email && formik.touched.email && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.email}
							</p>
						)}
					</FormControl>
					<Button
						type="submit"
						size="medium"
						variant="contained"
						style={{ width: "150px" }}
					>
						Cập nhật
					</Button>
				</GlobalForm>
			</Container>
		</>
	);
}

export default UpdatePage;
