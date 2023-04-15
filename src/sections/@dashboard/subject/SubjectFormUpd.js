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
import request from "src/utils/request";
import { useDispatch } from "react-redux";
import { fetchSubject } from "src/reducers/subjectSlice";
const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function SubjectFormUpd(props) {
	const dispatch = useDispatch();
	const { data, setOpen } = props;
	const formik = useFormik({
		initialValues: {
			subjectName: data.subjectName,
			tc: data.tc,
		},
		validationSchema: Yup.object({
			subjectName: Yup.string().required("Vui lòng nhập tên môn học"),
			tc: Yup.number("Nhập không đúng định dạng").required(
				"Vui lòng nhập số tín chỉ"
			),
		}),
		onSubmit: async (values) => {
			await request.patch(`subject/${data.id}`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			dispatch(fetchSubject());
			setOpen(false);
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
						name="tc"
						value={formik.values.tc}
						onChange={formik.handleChange}
					/>
					{formik.errors.tc && formik.touched.tc && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.tc}
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
