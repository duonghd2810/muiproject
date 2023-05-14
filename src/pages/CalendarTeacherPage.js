import { useState, useEffect } from "react";
import {
	Container,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
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

function CalendarTeacherPage() {
	const user = useSelector((state) => state.userReducer).data;
	const [tkb, setTkb] = useState([]);
	useEffect(() => {
		request
			.get(`classsection/tkb-teacher/${user.userId}`)
			.then((res) => setTkb(res.data));
	}, []);
	// const dataMap = new Map();

	// if (tkb.length !== 0) {
	// 	for (let i = 0; i < tkb.length; i++) {
	// 		const { id_day, ...dataValue } = tkb[i];
	// 		if (dataMap.has(id_day)) {
	// 			dataMap.set(id_day, [...dataMap.get(id_day), dataValue]);
	// 		} else {
	// 			dataMap.set(id_day, [dataValue]);
	// 		}
	// 	}
	// }
	return (
		<>
			<Helmet>
				<title>Lịch dạy</title>
			</Helmet>
			<Container>
				<Typography variant="h4" gutterBottom>
					Lịch dạy
				</Typography>

				<TableCalendar type="teacher" data={tkb} />
				{/* <Scrollbar>
					{Array.from(dataMap.entries()).map(([key, value]) => (
						<DivDayStyle key={key}>
							<Typography
								variant="h6"
								gutterBottom
								style={{ paddingLeft: "16px" }}
							>
								{key}
							</Typography>
							<TableContainer sx={{ minWidth: 800 }}>
								<Table>
									<TableBody>
										{value.map((item, i) => (
											<TableRow key={i} tabIndex={-1}>
												<TableCell
													component="th"
													scope="row"
													style={{ width: "25%" }}
												>
													<Stack
														direction="row"
														alignItems="left"
														spacing={2}
													>
														<Typography
															variant="subtitle2"
															noWrap
														>
															{`${item.mahp}.${item.idClassSection} ${item.tenhp}`}
														</Typography>
													</Stack>
												</TableCell>
												<TableCell
													align="left"
													style={{ width: "15%" }}
												>
													{`Tiết ${item.lesson}`}
												</TableCell>
												<TableCell
													align="left"
													style={{ width: "15%" }}
												>
													{`Phòng học ${item.id_classroom}`}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</DivDayStyle>
					))}
				</Scrollbar> */}
			</Container>
		</>
	);
}

export default CalendarTeacherPage;
