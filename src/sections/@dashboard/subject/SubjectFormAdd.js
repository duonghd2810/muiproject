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
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { fetchSubject } from "src/reducers/subjectSlice";
import request from "src/utils/request";
import * as Yup from "yup";
const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function SubjectFormAdd(props) {
	const { dataSelect } = props;
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			id_major: null,
			subjectName: "",
			tc: null,
		},
		validationSchema: Yup.object({
			id_major: Yup.number().required("Vui lòng chọn ngành học"),
			subjectName: Yup.string().required("Vui lòng nhập tên môn học"),
			tc: Yup.number("Nhập không đúng định dạng").required(
				"Vui lòng nhập số tín chỉ"
			),
		}),
		onSubmit: async (values) => {
			await request.post("subject", JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			dispatch(fetchSubject());
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
						name="tc"
						value={formik.values.tc || ""}
						onChange={formik.handleChange}
					/>
					{formik.errors.tc && formik.touched.tc && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.tc}
						</p>
					)}
				</FormControl>
				<Button type="submit" size="small" variant="contained">
					Thêm
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default SubjectFormAdd;
