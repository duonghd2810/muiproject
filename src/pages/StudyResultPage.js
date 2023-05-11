import { useEffect, useState } from "react";
import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import request from "src/utils/request";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

function StudyResultPage() {
	const [results, setResults] = useState([]);
	const user = useSelector((state) => state.userReducer).data;
	useEffect(() => {
		request
			.get(`coursegrade/studyresult/${user.userId}`)
			.then((res) => setResults(res.data))
			.catch(function (error) {
				return Promise.reject(error);
			});
	}, []);
	const showTBTX = (student) => {
		const { hs1, hs2, hs3, hs4, hs5 } = student;
		const arr = [hs1, hs2, hs3, hs4, hs5];
		const arrCheckNull = arr.filter((item) => item !== null);
		if (arrCheckNull.length === 0) return "";
		const tbc =
			arrCheckNull.reduce((total, value) => total + value, 0) /
			arrCheckNull.length;
		return tbc;
	};

	const showTBNumber = (student) => {
		if (student.finaltest === null) return "";
		const tbkt = showTBTX(student);
		const tb = (tbkt + student.finaltest * 2) / 3;
		return tb.toFixed(1);
	};

	const showTBText = (student) => {
		const tb = showTBNumber(student);
		if (tb === null) return "";
		if (tb >= 8.5) {
			return "A";
		} else if (tb >= 7.7) {
			return "B+";
		} else if (tb >= 7) {
			return "B";
		} else if (tb >= 6.2) {
			return "C+";
		} else if (tb >= 5.5) {
			return "C";
		} else if (tb >= 4.7) {
			return "D+";
		} else if (tb >= 4) {
			return "D";
		} else {
			if (tb === "") {
				return "";
			} else return "Kém";
		}
	};
	return (
		<>
			<Helmet>
				<title>Kết quả học tập</title>
			</Helmet>
			<Container>
				<Typography variant="h4" gutterBottom>
					Kết quả học tập các học phần
				</Typography>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell
									align="left"
									rowSpan={2}
									style={{ width: "25%" }}
								>
									Học phần
								</TableCell>
								<TableCell
									align="center"
									rowSpan={2}
									style={{ width: "10%" }}
								>
									Số TC
								</TableCell>
								<TableCell
									align="center"
									rowSpan={2}
									style={{ width: "8%" }}
								>
									TX1
								</TableCell>
								<TableCell
									align="center"
									rowSpan={2}
									style={{ width: "8%" }}
								>
									TX2
								</TableCell>
								<TableCell
									align="center"
									rowSpan={2}
									style={{ width: "8%" }}
								>
									TX3
								</TableCell>
								<TableCell
									align="center"
									rowSpan={2}
									style={{ width: "10%" }}
								>
									TB KTTX
								</TableCell>
								<TableCell
									align="center"
									colSpan={2}
									style={{ width: "14%" }}
								>
									Điểm thi
								</TableCell>
								<TableCell
									align="center"
									rowSpan={2}
									style={{ width: "10%" }}
								>
									Trung bình môn
								</TableCell>
								<TableCell
									align="right"
									rowSpan={2}
									style={{ width: "7%" }}
								>
									Xếp loại
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">Lần 1</TableCell>
								<TableCell align="center">Lần 2</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{results.length > 0 &&
								results.map((row, i) => {
									const {
										tenHp,
										soTc,
										hs1,
										hs2,
										hs3,
										finaltest,
									} = row;
									return (
										<TableRow key={i.toString()}>
											<TableCell align="left">
												{tenHp}
											</TableCell>
											<TableCell align="center">
												{soTc}
											</TableCell>
											<TableCell align="center">
												{hs1}
											</TableCell>
											<TableCell align="center">
												{hs2}
											</TableCell>
											<TableCell align="center">
												{hs3}
											</TableCell>
											<TableCell align="center">
												{showTBTX(row)}
											</TableCell>
											<TableCell align="center">
												{finaltest}
											</TableCell>
											<TableCell align="center"></TableCell>
											<TableCell align="center">
												{showTBNumber(row)}
											</TableCell>
											<TableCell align="center">
												{showTBText(row)}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
}

export default StudyResultPage;
