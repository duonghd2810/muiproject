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
import { fetchMajor } from "src/reducers/majorSlice";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function MajorFormAdd() {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			majorName: "",
			deanName: "",
		},
		validationSchema: Yup.object({
			majorName: Yup.string().required("Vui lòng nhập tên ngành"),
			deanName: Yup.string().required("Vui lòng nhập tên trưởng khoa"),
		}),
		onSubmit: async (values) => {
			await request.post("major", JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			dispatch(fetchMajor());
			formik.handleReset();
		},
	});
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={formik.handleSubmit}>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Tên ngành
					</InputLabel>
					<Input
						id="component-simple"
						name="majorName"
						value={formik.values.majorName}
						onChange={formik.handleChange}
					/>
					{formik.errors.majorName && formik.touched.majorName && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.majorName}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Trưởng khoa
					</InputLabel>
					<Input
						id="component-simple"
						name="deanName"
						value={formik.values.deanName}
						onChange={formik.handleChange}
					/>
					{formik.errors.deanName && formik.touched.deanName && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.deanName}
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

export default MajorFormAdd;
