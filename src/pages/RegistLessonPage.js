import {
	Card,
	Container,
	MenuItem,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import { filter } from "lodash";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "src/components/iconify/Iconify";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { fetchClassSectionByStudent } from "src/reducers/classSectionByIdStudentSlice";
import { fetchClassSection } from "src/reducers/classSectionSlice";
import ClassSectionListHead from "src/sections/@dashboard/classSection/ClassSectionListHead";
import request from "src/utils/request";

const TABLE_HEAD = [
	{ id: "subjectCode", label: "Mã HP", alignRight: false },
	{ id: "tenHp", label: "Tên HP", alignRight: false },
	{ id: "soTc", label: "Số tín chỉ", alignRight: false },
	{ id: "teacherName", label: "Giáo viên dạy", alignRight: false },
	{ id: "" },
];
// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	if (Object.keys(array).length === 0) {
		return [];
	}
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_subject) =>
				_subject.subjectName
					.toLowerCase()
					.indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}
function RegistLessonPage() {
	const dispatch = useDispatch();
	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");
	const user = useSelector((state) => state.userReducer).data;
	useEffect(() => {
		dispatch(fetchClassSectionByStudent(user.userId));
	}, []);
	const CLASSSECTIONTLIST = useSelector(
		(state) => state.classSectionByStudentReducer
	).data;

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	const filteredSubjects = applySortFilter(
		CLASSSECTIONTLIST,
		getComparator(order, orderBy),
		filterName
	);
	const handleOpenAdd = async (row) => {
		try {
			await request.post(
				`coursegrade/${row.id}/registclasssection/${user.userId}`
			);
			alert("Đăng ký thành công");
		} catch {
			alert("Bạn đã đăng ký học phần này rồi");
		}
	};
	return (
		<>
			<Helmet>
				<title>Đăng ký học phần</title>
			</Helmet>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Đăng ký học phần
					</Typography>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<ClassSectionListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{filteredSubjects.length != 0 &&
										filteredSubjects.map((row) => {
											const {
												id,
												subjectCode,
												soTc,
												tenHp,
												teacherName,
											} = row;
											return (
												<TableRow
													hover
													key={id}
													tabIndex={-1}
												>
													<TableCell
														component="th"
														scope="row"
													>
														<Stack
															direction="row"
															alignItems="center"
															spacing={2}
														>
															<Typography
																variant="subtitle2"
																noWrap
															>
																{`${subjectCode}.${id}`}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell align="left">
														{tenHp}
													</TableCell>
													<TableCell align="left">
														{soTc}
													</TableCell>
													<TableCell align="left">
														{teacherName}
													</TableCell>
													<TableCell
														align="right"
														width="15%"
													>
														<MenuItem
															onClick={() =>
																handleOpenAdd(
																	row
																)
															}
															sx={{
																color: "success.main",
															}}
														>
															<Iconify
																icon={
																	"eva:plus-fill"
																}
															/>
															Đăng ký
														</MenuItem>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			</Container>
		</>
	);
}

export default RegistLessonPage;
