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
import { isEmpty } from "lodash";

function DetailClassSectionPage() {
	const dispatch = useDispatch();
	const { idClass } = useParams();
	const [classSection, setClassSection] = useState();
	const [selectedFile, setSelectedFile] = useState(null);
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
		const { hs1, hs2, hs3, hs4, hs5 } = student;
		const arr = [hs1, hs2, hs3, hs4, hs5];
		const arrCheckNull = arr.filter((item) => item !== null);
		if (arrCheckNull.length === 0) return "";
		const tbc =
			arrCheckNull.reduce((total, value) => total + value, 0) /
			arrCheckNull.length;
		return tbc;
	};
	const exportFile = async () => {
		const response = await request.get(`coursegrade/export/${idClass}`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(
			new Blob([response.data], {
				type: response.data.type,
			})
		);
		let a = window.document.createElement("a");
		a.href = url;
		a.target = "_blank";
		a.download = "Danh sách lớp " + classSection.tenHp;
		a.click();
	};
	const handleFileSelect = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleFileUpload = () => {
		const formData = new FormData();
		formData.append("file", selectedFile);

		request
			.post(`coursegrade/import/${idClass}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log("File uploaded successfully:", response.data);
			})
			.catch((error) => {
				console.error(error);
			});
		dispatch(fetchStudentInclassSection(idClass));
	};
	return (
		<>
			<Helmet>
				<title>Lớp học phần</title>
			</Helmet>
			<Container>
				<Grid container margin={2}>
					<Grid item xs={3}>
						<Typography variant="h6">
							Mã học phần:&nbsp;
							{!!classSection &&
								`${classSection.subjectCode}.${classSection.id}`}
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<Typography variant="h6">
							Tên học phần:&nbsp;
							{!!classSection && classSection.tenHp}
						</Typography>
					</Grid>
					<Grid
						item
						xs={4}
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<input
							style={{ flex: "2" }}
							type="file"
							onChange={handleFileSelect}
						/>
						<Button
							variant="contained"
							onClick={handleFileUpload}
							style={{ flex: "1" }}
						>
							Import file
						</Button>
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
													{student.sotietnghi}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: "15%" }}
												>
													{showTBTX(student) < 4
														? "Không đủ ĐK"
														: "Đủ ĐK"}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
				<Button
					variant="contained"
					style={{ position: "fixed", bottom: "10px" }}
					onClick={exportFile}
				>
					Export
				</Button>
			</Container>
		</>
	);
}

export default DetailClassSectionPage;
