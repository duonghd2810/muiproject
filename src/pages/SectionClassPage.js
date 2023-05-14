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
	Chip,
	Button,
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import request from "src/utils/request";
import { loadingActions } from "src/reducers/loadingSlice";

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
function SectionClassPage() {
	const dispatch = useDispatch();
	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");
	const [openPopupUpd, setOpenPopupUpd] = useState(false);
	const [openPopupDel, setOpenPopupDel] = useState(false);

	const [recordForEdit, setRecordForEdit] = useState(null);

	const [timeValue, setTimeValue] = useState([null, null]);
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
	const handleUpdateTime = async () => {
		try {
			const value = {
				startDate: timeValue[0].toISOString(),
				endDate: timeValue[1].toISOString(),
			};
			dispatch(loadingActions.update(true));
			await request.post("dateregist", JSON.stringify(value), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			alert("Cập nhật lại thời gian đăng ký học phần thành công");
		} finally {
			dispatch(loadingActions.update(false));
		}
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
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DateRangePicker"]}>
							<DateRangePicker
								format="DD / MM / YYYY"
								localeText={{
									start: "Ngày đăng ký học phần",
									end: "Ngày kết thúc đăng ký học phần",
								}}
								value={timeValue}
								onChange={(newValue) => {
									setTimeValue(newValue);
								}}
							/>
						</DemoContainer>
					</LocalizationProvider>
					&nbsp;
					<Button
						onClick={handleUpdateTime}
						size="small"
						variant="contained"
						style={{ width: "120px" }}
					>
						Cập nhật
					</Button>
				</div>
				<br />
				<br />
				<br />
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
												id_classroom,
												id_day,
												lesson,
												teacherName,
												status,
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
														style={{ width: "17%" }}
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
														style={{ width: "10%" }}
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
														style={{ width: "15%" }}
													>
														{status === "acting" ? (
															<div
																style={{
																	display:
																		"flex",
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
														) : (
															<Chip
																sx={{
																	color: "error.main",
																}}
																label="Đã kết thúc"
															/>
														)}
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
