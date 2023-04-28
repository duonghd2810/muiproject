import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import request from "src/utils/request";
import { useDispatch } from "react-redux";
import TeacherByMajor from "src/components/important-components/TeacherByMajor";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
ClassSectionFormUpd.propTypes = {
	props: PropTypes.object,
};
function ClassSectionFormUpd(props) {
	const dispatch = useDispatch();
	const { data, setOpen } = props;
	const [dataDay, setDataDay] = useState([]);
	const [dataRoom, setDataRoom] = useState([]);
	useEffect(() => {
		request.get("days").then((res) => {
			setDataDay(res.data);
		});
	}, []);
	useEffect(() => {
		request.get("rooms").then((res) => {
			setDataRoom(res.data);
		});
	}, []);
	const formik = useFormik({
		initialValues: {
			id_teacher: data.id_teacher,
			id_day: data.id_day,
			lessonStart: null,
			lessonEnd: null,
			id_classroom: data.id_classroom,
		},
		validationSchema: Yup.object({
			id_teacher: Yup.number().required("Vui lòng chọn giáo viên dạy"),
			id_day: Yup.string().required("Vui lòng chọn ngày học"),
			id_classroom: Yup.string().required("Vui lòng chọn phòng học"),
		}),
		onSubmit: async (values) => {
			const { lessonStart, lessonEnd, ...value } = values;
			let data = [];
			for (let i = lessonStart; i <= lessonEnd; i++) {
				data.push(i);
			}
			const newObject = {
				lesson: data.join(","),
			};
			const newValues = { ...value, ...newObject };
			console.log(
				"🚀 ~ file: ClassSectionFormUpd.js:65 ~ onSubmit: ~ newValues:",
				newValues
			);
		},
	});
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={formik.handleSubmit}>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel id="demo-simple-select-label">
						Giáo viên dạy
					</InputLabel>
					<TeacherByMajor
						setTeacher={formik.handleChange}
						idMajor={data.idMajor}
						idTeacher={formik.id_teacher}
					/>
					{formik.errors.id_teacher && formik.touched.id_teacher && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.id_teacher}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel id="demo-simple-select-label">
						Ngày học
					</InputLabel>
					<Select
						label="Ngày học"
						labelId="demo-simple-select-label"
						name="id_day"
						onChange={formik.handleChange}
						defaultValue={data.id_day}
					>
						{dataDay.map((item) => (
							<MenuItem
								key={item.dayOfWeek}
								value={item.dayOfWeek}
							>
								{item.dayOfWeek}
							</MenuItem>
						))}
					</Select>
					{formik.errors.id_day && formik.touched.id_day && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.id_day}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<Grid container justifyContent="space-between">
						<Grid item xs={5}>
							<TextField
								label="Tiết bắt đầu"
								id="outlined-basic"
								variant="outlined"
								type="number"
								name="lessonStart"
								onChange={formik.handleChange}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								label="Tiết kết thúc"
								id="outlined-basic"
								variant="outlined"
								type="number"
								name="lessonEnd"
								onChange={formik.handleChange}
							/>
						</Grid>
					</Grid>
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<InputLabel id="demo-simple-select-label">
						Phòng học
					</InputLabel>
					<Select
						label="Phòng học"
						labelId="demo-simple-select-label"
						name="id_classroom"
						onChange={formik.handleChange}
						defaultValue={data.id_classroom}
					>
						{dataRoom.map((item) => (
							<MenuItem key={item.tenPhong} value={item.tenPhong}>
								{item.tenPhong}
							</MenuItem>
						))}
					</Select>
					{formik.errors.id_classroom &&
						formik.touched.id_classroom && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.id_classroom}
							</p>
						)}
				</FormControl>
				<Button
					type="submit"
					size="small"
					variant="contained"
					// onClick={() => setOpen(false)}
				>
					Cập nhật
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default ClassSectionFormUpd;
