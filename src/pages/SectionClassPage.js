import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useEffect, useState } from "react";
// @mui
import {
	Card,
	Table,
	Stack,
	TableRow,
	MenuItem,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassSection } from "src/reducers/classSectionSlice";
import PopupDel from "src/sections/@dashboard/popup/PopupDel";
import ClassSectionListHead from "src/sections/@dashboard/classSection/ClassSectionListHead";
import Popup from "src/sections/@dashboard/popup/Popup";
import ClassSectionFormUpd from "src/sections/@dashboard/classSection/ClassSectionFormUpd";

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
function SectionClassPage() {
	const dispatch = useDispatch();
	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");
	const [openPopupUpd, setOpenPopupUpd] = useState(false);
	const [openPopupDel, setOpenPopupDel] = useState(false);

	const [recordForEdit, setRecordForEdit] = useState(null);

	useEffect(() => {
		dispatch(fetchClassSection());
	}, []);
	const CLASSSECTIONTLIST = useSelector(
		(state) => state.classSectionReducer
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
	const handleOpenUpd = (row) => {
		setRecordForEdit(row);
		setOpenPopupUpd(true);
	};
	const handleOpenDel = (row) => {
		setRecordForEdit(row);
		setOpenPopupDel(true);
	};
	return (
		<>
			<Helmet>
				<title>Quản lý lớp học phần</title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Lớp học phần
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
									{filteredSubjects.length !== 0 &&
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
														style={{ width: "10%" }}
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
																{`${subjectCode}.${id}`}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell
														align="left"
														style={{ width: "15%" }}
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
														style={{ width: "20%" }}
													>
														{teacherName}
													</TableCell>
													<TableCell
														align="right"
														style={{ width: "15%" }}
													>
														<div
															style={{
																display: "flex",
																justifyContent:
																	"flex-end",
															}}
														>
															<MenuItem
																onClick={() =>
																	handleOpenUpd(
																		row
																	)
																}
															>
																<Iconify
																	icon={
																		"eva:edit-fill"
																	}
																/>
																Edit
															</MenuItem>

															<MenuItem
																onClick={() =>
																	handleOpenDel(
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
																Delete
															</MenuItem>
														</div>
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
				title="Bạn muốn xóa lớp học phần này không?"
				type="classsection"
				data={recordForEdit}
			></PopupDel>
			<Popup
				openPopup={openPopupUpd}
				setOpenPopup={setOpenPopupUpd}
				title="Cập nhật lớp học phần"
			>
				<ClassSectionFormUpd
					data={recordForEdit}
					setOpen={setOpenPopupUpd}
				/>
			</Popup>
		</>
	);
}

export default SectionClassPage;
