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

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function MajorFormAdd() {
	const formik = useFormik({
		initialValues: {
			tennganh: "",
			truongkhoa: "",
		},
		validationSchema: Yup.object({
			tennganh: Yup.string().required("Tên ngành phải được nhập"),
			truongkhoa: Yup.string().required("Trưởng khoa phải được nhập"),
		}),
		onSubmit: (values) => {
			formik.handleReset();
			console.log(values);
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
						name="tennganh"
						value={formik.values.tennganh}
						onChange={formik.handleChange}
					/>
					{formik.errors.tennganh && formik.touched.tennganh && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.tennganh}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel htmlFor="component-simple">
						Trưởng khoa
					</InputLabel>
					<Input
						id="component-simple"
						name="truongkhoa"
						value={formik.values.truongkhoa}
						onChange={formik.handleChange}
					/>
					{formik.errors.truongkhoa && formik.touched.truongkhoa && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.truongkhoa}
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
