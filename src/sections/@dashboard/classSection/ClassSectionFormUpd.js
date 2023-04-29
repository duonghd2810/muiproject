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
import { useDispatch, useSelector } from "react-redux";
import TeacherByMajor from "src/components/important-components/TeacherByMajor";
import { fetchClassSection } from "src/reducers/classSectionSlice";
import { cloneDeep, isEmpty } from "lodash";

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

	const { mappingData, mappingTeacher } = useSelector(
		(state) => state.classSectionReducer
	);

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
		enableReinitialize: true,
		initialValues: {
			id_teacher: data.id_teacher || undefined,
			id_day: data.id_day,
			lessonStart: !isEmpty(data.lesson)
				? data.lesson.split(",")[0]
				: null,
			lessonEnd: !isEmpty(data.lesson)
				? data.lesson.split(",")[data.lesson.split(",").length - 1]
				: null,
			id_classroom: data.id_classroom,
		},
		validationSchema: Yup.object({
			id_teacher: Yup.number().required("Vui lòng chọn giáo viên dạy"),
			id_day: Yup.string().required("Vui lòng chọn ngày học"),
			lessonStart: Yup.number().required("Vui lòng nhập tiết bắt đầu"),
			lessonEnd: Yup.number().required("Vui lòng nhập tiết kết thúc"),
			id_classroom: Yup.string().required("Vui lòng chọn phòng học"),
		}),
		onSubmit: async (values) => {
			const newMappingData = cloneDeep(mappingData);
			const keyMappingData = [
				props.data.id_classroom,
				props.data.id_day,
			].join("-");
			newMappingData[keyMappingData] = (
				newMappingData[keyMappingData] || []
			).filter((el) => {
				return !(props.data.lesson || "").includes(el);
			});

			const newMappingTeacher = cloneDeep(mappingTeacher);
			const keyMappingTeacher = [
				props.data.id_day,
				props.data.id_teacher,
			].join("-");
			newMappingTeacher[keyMappingTeacher] = (
				mappingTeacher[keyMappingTeacher] || []
			).filter((el) => {
				return !(props.data.lesson || "").includes(el);
			});

			const { lessonStart, lessonEnd, ...value } = values;
			let data = [];
			for (let i = lessonStart; i <= lessonEnd; i++) {
				data.push(i);
			}
			const newObject = {
				lesson: data.join(","),
			};
			const newValues = { ...value, ...newObject };
			const { id_classroom, id_day, id_teacher, lesson } = newValues;
			if (
				newMappingData[[id_classroom, id_day].join("-")].some((item) =>
					lesson.includes(item)
				)
			) {
				return alert("Không thể cập nhật do trùng lịch");
			}
			if (
				newMappingTeacher[[id_day, id_teacher].join("-")].some((item) =>
					lesson.includes(item)
				)
			) {
				return alert(
					"Không thể cập nhật do giáo viên đang dạy tiết học khác"
				);
			}
			try {
				await request.patch(
					`classsection/updateClass/${props.data.id}`,
					JSON.stringify(newValues),
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				dispatch(fetchClassSection());
				setOpen(false);
			} catch (err) {
				console.log(err);
			}
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
						idTeacher={formik.values.id_teacher}
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
								defaultValue={
									!isEmpty(data.lesson)
										? data.lesson.split(",")[0]
										: null
								}
							/>
							{formik.errors.lessonStart &&
								formik.touched.lessonStart && (
									<p
										style={{
											color: "red",
											margin: "4px 0",
										}}
									>
										{formik.errors.lessonStart}
									</p>
								)}
						</Grid>
						<Grid item xs={5}>
							<TextField
								label="Tiết kết thúc"
								id="outlined-basic"
								variant="outlined"
								type="number"
								name="lessonEnd"
								onChange={formik.handleChange}
								defaultValue={
									!isEmpty(data.lesson)
										? data.lesson.split(",")[
												data.lesson.split(",").length -
													1
										  ]
										: null
								}
							/>
							{formik.errors.lessonEnd &&
								formik.touched.lessonEnd && (
									<p
										style={{
											color: "red",
											margin: "4px 0",
										}}
									>
										{formik.errors.lessonEnd}
									</p>
								)}
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
				<Button type="submit" size="small" variant="contained">
					Cập nhật
				</Button>
			</GlobalForm>
		</Container>
	);
}

export default ClassSectionFormUpd;
