import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import request from "src/utils/request";
TeacherByMajor.propTypes = {
	setTeacher: PropTypes.func,
	idMajor: PropTypes.number,
	idTeacher: PropTypes.number,
};
function TeacherByMajor({ setTeacher, idMajor, idTeacher }) {
	const [dataSelect, setDataSelect] = useState([]);
	useEffect(() => {
		request
			.get(`user/teacherbyidmajor/${idMajor}`)
			.then((res) => {
				setDataSelect(res.data.result);
			})
			.catch(function (error) {
				return Promise.reject(error);
			});
	}, []);
	return (
		<Select
			label="Giáo viên dạy"
			labelId="demo-simple-select-label"
			name="id_teacher"
			onChange={setTeacher}
			defaultValue={idTeacher || null}
		>
			{dataSelect?.map((item) => (
				<MenuItem key={item.id} value={item.id}>
					{item.fullName}
				</MenuItem>
			))}
		</Select>
	);
}

export default TeacherByMajor;
