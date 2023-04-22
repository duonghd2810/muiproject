import {
	Button,
	Card,
	Container,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import request from "src/utils/request";
import ClassSectionDetailHead from "src/sections/@dashboard/classSection/ClassSectionDetailHead";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentInclassSection } from "src/reducers/allStudentInClassSection";

function DetailClassSectionPage() {
	const dispatch = useDispatch();
	const { idClass } = useParams();
	const [classSection, setClassSection] = useState();
	useEffect(() => {
		request
			.get(`classsection/classdetail/${idClass}`)
			.then((res) => setClassSection(res.data))
			.catch(function (error) {
				return Promise.reject(error);
			});
	}, []);
	useEffect(() => {
		dispatch(fetchStudentInclassSection(idClass));
	}, []);
	const STUDENTLISTS = useSelector(
		(state) => state.studentInclassSectionReducer
	).data;
	const showTBTX = (student) => {
		let tb = 0.0;
	};
	return (
		<>
			<Helmet>
				<title>Lớp học phần</title>
			</Helmet>
			<Container>
				<Grid container margin={2}>
					<Grid item xs={4}>
						<Typography variant="h5" gutterBottom>
							Mã học phần:&nbsp;
							{!!classSection &&
								`${classSection.subjectCode}.${classSection.id}`}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h5" gutterBottom>
							Tên học phần:&nbsp;
							{!!classSection && classSection.tenHp}
						</Typography>
					</Grid>
					<Grid
						item
						xs={4}
						style={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<Button>Export</Button>
						<Button>Import</Button>
					</Grid>
				</Grid>
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<ClassSectionDetailHead />
								<TableBody>
									{Object.keys(STUDENTLISTS).length !== 0 &&
										STUDENTLISTS.map((student, index) => (
											<TableRow
												hover
												key={index}
												tabIndex={-1}
											>
												<TableCell
													align="center"
													style={{ width: "12%" }}
												>
													{student.masv}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "25%" }}
												>
													{student.tensinhvien}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "6%" }}
												>
													{student.hs1}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "6%" }}
												>
													{student.hs2}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "6%" }}
												>
													{student.hs3}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "6%" }}
												>
													{student.hs4}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "6%" }}
												>
													{student.hs5}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "10%" }}
												>
													{showTBTX(student)}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "8%" }}
												>
													4
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "15%" }}
												>
													đủ
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			</Container>
		</>
	);
}

export default DetailClassSectionPage;
