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
const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function SubjectFormUpd(props) {
	const { data, dataSelect } = props;
	const formik = useFormik({
		initialValues: {
			subjectName: data.subjectName,
			countTc: data.countTc,
			id_teacher: data.id_teacher,
		},
		validationSchema: Yup.object({
			subjectName: Yup.string().required("Vui lòng nhập tên môn học"),
			countTc: Yup.string().required("Vui lòng nhập số tín chỉ"),
			id_teacher: Yup.number().required("Vui lòng chọn giáo viên dạy"),
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
					<InputLabel htmlFor="component-simple">
						Tên môn học
					</InputLabel>
					<Input
						id="component-simple"
						name="subjectName"
						value={formik.values.subjectName}
						onChange={formik.handleChange}
					/>
					{formik.errors.subjectName &&
						formik.touched.subjectName && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.subjectName}
							</p>
						)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Số tín chỉ
					</InputLabel>
					<Input
						id="component-simple"
						name="countTc"
						value={formik.values.countTc}
						onChange={formik.handleChange}
					/>
					{formik.errors.countTc && formik.touched.countTc && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.countTc}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel id="demo-simple-select-label">
						Giáo viên dạy
					</InputLabel>
					<Select
						label="Giáo viên dạy"
						labelId="demo-simple-select-label"
						name="id_teacher"
						onChange={formik.handleChange}
						defaultValue={data.id_teacher}
					>
						{dataSelect.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.fullName}
							</MenuItem>
						))}
					</Select>
					{formik.errors.id_teacher && formik.touched.id_teacher && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.id_teacher}
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

export default SubjectFormUpd;
