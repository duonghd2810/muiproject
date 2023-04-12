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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import request from "src/utils/request";
const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function CollegeClassFormUpd(props) {
	const { data, dataSelect, setOpen } = props;
	console.log(data);
	const formik = useFormik({
		initialValues: {
			id_major: data.id_major,
			className: data.className,
			homeroomTeacher: data.homeroomTeacher,
		},
		validationSchema: Yup.object({
			id_major: Yup.number().required("Vui lòng chọn ngành học"),
			className: Yup.string().required("Vui lòng nhập lớp chính quy"),
			homeroomTeacher: Yup.string().required(
				"Vui lòng nhập tên giáo viên chủ nhiệm"
			),
		}),
		onSubmit: (values) => {
			request.patch(`class/${data.id}`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setOpen(false);
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
						defaultValue={data.id_major}
					>
						{dataSelect.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.majorName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Tên lớp chính quy
					</InputLabel>
					<Input
						id="component-simple"
						name="className"
						value={formik.values.className}
						onChange={formik.handleChange}
					/>
					{formik.errors.className && formik.touched.className && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.className}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Giáo viên chủ nhiệm
					</InputLabel>
					<Input
						id="component-simple"
						name="homeroomTeacher"
						value={formik.values.homeroomTeacher}
						onChange={formik.handleChange}
					/>
					{formik.errors.homeroomTeacher &&
						formik.touched.homeroomTeacher && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.homeroomTeacher}
							</p>
						)}
				</FormControl>
				<Button type="submit" size="small" variant="contained">
					Cập nhật
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default CollegeClassFormUpd;
