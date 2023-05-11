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
import { fetchClassSectionRegistedByStudent } from "src/reducers/alllClassSectionRegistedByStudent";
import { fetchClassSectionByStudent } from "src/reducers/classSectionByIdStudentSlice";
import ClassSectionListHead from "src/sections/@dashboard/classSection/ClassSectionListHead";
import PopupDel from "src/sections/@dashboard/popup/PopupDel";
import request from "src/utils/request";

const TABLE_HEAD = [
	{ id: "subjectCode", label: "Mã HP", alignRight: false },
	{ id: "tenHp", label: "Tên HP", alignRight: false },
	{ id: "soTc", label: "Số tín chỉ", alignRight: false },
	{ id: "id_classroom", label: "Phòng học", alignRight: false },
	{ id: "id_day", label: "Ngày học", alignRight: false },
	{ id: "lesson", label: "Tiết học", alignRight: false },
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
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [openPopupDel, setOpenPopupDel] = useState(false);
	const user = useSelector((state) => state.userReducer).data;

	useEffect(() => {
		dispatch(fetchClassSectionByStudent(user.userId));
	}, []);
	const CLASSSECTIONTLIST = useSelector(
		(state) => state.classSectionByStudentReducer
	).data;

	useEffect(() => {
		dispatch(fetchClassSectionRegistedByStudent(user.userId));
	}, []);
	const CLASSSECTIONTLISTREGISTED = useSelector(
		(state) => state.classSectionRegistedByStudentReducer
	).data;

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	const filteredClassSections = applySortFilter(
		CLASSSECTIONTLIST,
		getComparator(order, orderBy),
		filterName
	);
	const handleOpenAdd = async (row) => {
		try {
			await request.post(
				`coursegrade/${row.id}/registclasssection/${user.userId}`
			);
			dispatch(fetchClassSectionRegistedByStudent(user.userId));
			alert("Đăng ký thành công");
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	const handleOpenDelete = (row) => {
		setRecordForEdit(row);
		setOpenPopupDel(true);
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
					mb={2}
				>
					<Typography variant="h4">Đăng ký học phần</Typography>
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
									{filteredClassSections.length !== 0 &&
										filteredClassSections.map((row) => {
											const {
												id,
												subjectCode,
												soTc,
												tenHp,
												teacherName,
												id_classroom,
												id_day,
												lesson,
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
														style={{ width: "8%" }}
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

													<TableCell
														align="left"
														style={{ width: "20%" }}
													>
														{tenHp}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "10%" }}
													>
														{soTc}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "12%" }}
													>
														{id_classroom}
													</TableCell>
													<TableCell
														align="left"
														style={{
															width: "10%",
															fontWeight: "700",
														}}
													>
														{id_day}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "10%" }}
													>
														{lesson}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "20%" }}
													>
														{teacherName}
													</TableCell>
													<TableCell
														align="right"
														width="10%"
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
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mt={4}
					mb={2}
				>
					<Typography variant="h5" gutterBottom>
						Danh sách học phần đã đăng ký
					</Typography>
				</Stack>
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<TableBody>
									{Object.keys(CLASSSECTIONTLISTREGISTED)
										.length !== 0 &&
										CLASSSECTIONTLISTREGISTED.map((row) => {
											const {
												idClass,
												subjectCode,
												tenHp,
												soTc,
												id_classroom,
												id_day,
												lesson,
												teacherName,
											} = row;
											return (
												<TableRow
													hover
													key={idClass}
													tabIndex={-1}
												>
													<TableCell
														component="th"
														scope="row"
														style={{ width: "8%" }}
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
																{`${subjectCode}.${idClass}`}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell
														align="left"
														style={{ width: "20%" }}
													>
														{tenHp}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "10%" }}
													>
														{soTc}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "12%" }}
													>
														{id_classroom}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "10%" }}
													>
														{id_day}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "10%" }}
													>
														{lesson}
													</TableCell>
													<TableCell
														align="left"
														style={{ width: "20%" }}
													>
														{teacherName}
													</TableCell>
													<TableCell
														align="right"
														width="15%"
													>
														<MenuItem
															onClick={() =>
																handleOpenDelete(
																	row
																)
															}
															sx={{
																color: "error.main",
															}}
														>
															<Iconify
																icon={
																	"eva:trash-2-outline"
																}
															/>
															Hủy đăng ký
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
			<PopupDel
				openPopup={openPopupDel}
				setOpenPopup={setOpenPopupDel}
				title="Bạn muốn hủy học phần này không?"
				type="cancel-registed"
				data={recordForEdit}
			></PopupDel>
		</>
	);
}

export default RegistLessonPage;
