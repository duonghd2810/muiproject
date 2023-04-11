import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
	Button,
	Container,
	FormControl,
	Input,
	InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import request from "src/utils/request";
import { useDispatch } from "react-redux";
import { fetchMajor } from "src/reducers/majorSlice";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
MajorFormUpd.propTypes = {
	props: PropTypes.object,
};
function MajorFormUpd(props) {
	const dispatch = useDispatch();
	const { data } = props;
	console.log(data);
	const formik = useFormik({
		initialValues: {
			majorName: data.majorName,
			deanName: data.deanName,
		},
		validationSchema: Yup.object({
			majorName: Yup.string().required("Vui lòng nhập tên ngành"),
			deanName: Yup.string().required("Vui lòng nhập tên trưởng khoa"),
		}),
		onSubmit: async (values) => {
			await request.patch(
				`major/update/${data.id}`,
				JSON.stringify(values),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
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
					Cập nhật
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default MajorFormUpd;
