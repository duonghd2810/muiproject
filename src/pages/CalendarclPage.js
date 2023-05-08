import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import request from "src/utils/request";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { styled } from "@mui/material/styles";
import TableCalendar from "src/components/table-calendar";

const DivDayStyle = styled("div")(({ theme }) => ({
	marginTop: "16px",
	background: "#fff",
	borderRadius: "6px",
}));

function CalendarclPage() {
	const user = useSelector((state) => state.userReducer).data;
	const [tkb, setTkb] = useState([]);
	useEffect(() => {
		request
			.get(`coursegrade/tkb/${user.userId}`)
			.then((res) => setTkb(res.data));
	}, []);
	const dataMap = new Map();

	if (tkb.length !== 0) {
		for (let i = 0; i < tkb.length; i++) {
			const { id_day, ...dataValue } = tkb[i];
			if (dataMap.has(id_day)) {
				dataMap.set(id_day, [...dataMap.get(id_day), dataValue]);
			} else {
				dataMap.set(id_day, [dataValue]);
			}
		}
	}
	return (
		<>
			<Helmet>
				<title>Thời khóa biểu</title>
			</Helmet>
			<Container>
				<Typography variant="h4" gutterBottom>
					Thời khóa biểu
				</Typography>
				<TableCalendar data={tkb} />
			</Container>
		</>
	);
}

export default CalendarclPage;
