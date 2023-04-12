import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useEffect, useState } from "react";
// @mui
import {
	Card,
	Table,
	Stack,
	Paper,
	Button,
	Popover,
	TableRow,
	MenuItem,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// mock
import CollegeClassListToolbar from "src/sections/@dashboard/collegeclass/CollegeClassListToolbar";
import CollegeClassListHead from "src/sections/@dashboard/collegeclass/CollegeClassListHead";
import Popup from "src/sections/@dashboard/popup/Popup";
import CollegeClassFormAdd from "src/sections/@dashboard/collegeclass/CollegeClassFormAdd";
import CollegeClassFormUpd from "src/sections/@dashboard/collegeclass/CollegeClassFormUpd";
import PopupDel from "src/sections/@dashboard/popup/PopupDel";
import { useDispatch, useSelector } from "react-redux";
import { fetchMajor } from "src/reducers/majorSlice";
import request from "src/utils/request";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "className", label: "Tên lớp", alignRight: false },
	{ id: "homeroomTeacher", label: "Giáo viên chủ nhiệm", alignRight: false },
	{ id: "majorName", label: "Ngành", alignRight: false },
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
	if (array.length == 0) {
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
			(_class) =>
				_class.className.toLowerCase().indexOf(query.toLowerCase()) !==
				-1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function CollegeClassPage() {
	const dispatch = useDispatch();
	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [openPopupAdd, setOpenPopupAdd] = useState(false);
	const [openPopupUpd, setOpenPopupUpd] = useState(false);
	const [openPopupDel, setOpenPopupDel] = useState(false);

	const [recordForEdit, setRecordForEdit] = useState(null);

	const [filterName, setFilterName] = useState("");
	const [collegeClass, setCollegeClass] = useState([]);

	useEffect(() => {
		dispatch(fetchMajor());
	}, []);
	const dataSelect = useSelector((state) => state.majorReducer).data;
	useEffect(() => {
		request.get("class").then((res) => setCollegeClass(res.data));
	}, []);
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const filteredCollegeClasses = applySortFilter(
		collegeClass,
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
				<title>Quản lý lớp chính quy</title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Lớp chính quy
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={() => setOpenPopupAdd(true)}
					>
						Thêm lớp chính quy mới
					</Button>
				</Stack>

				<Card>
					<CollegeClassListToolbar
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<CollegeClassListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{filteredCollegeClasses.length != 0 &&
										filteredCollegeClasses.map((row) => {
											const {
												id,
												className,
												homeroomTeacher,
												id_major,
												majorName,
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
																{className}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell align="left">
														{homeroomTeacher}
													</TableCell>
													<TableCell align="left">
														{majorName}
													</TableCell>
													<TableCell
														align="right"
														width="15%"
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
			<Popup
				openPopup={openPopupAdd}
				setOpenPopup={setOpenPopupAdd}
				title="Thêm lớp chính quy"
			>
				<CollegeClassFormAdd dataSelect={dataSelect} />
			</Popup>
			<PopupDel
				openPopup={openPopupDel}
				setOpenPopup={setOpenPopupDel}
				title="Bạn muốn xóa lớp này không?"
				type="class"
				data={recordForEdit}
			></PopupDel>
			<Popup
				openPopup={openPopupUpd}
				setOpenPopup={setOpenPopupUpd}
				title="Cập nhật lớp chính quy"
			>
				<CollegeClassFormUpd
					data={recordForEdit}
					dataSelect={dataSelect}
					setOpen={setOpenPopupUpd}
				/>
			</Popup>
		</>
	);
}
