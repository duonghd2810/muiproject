import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState } from "react";
// @mui
import {
	Card,
	Table,
	Stack,
	Button,
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
// section
import MajorListToolbar from "src/sections/@dashboard/major/MajorListToolbar";
import MajorListHead from "src/sections/@dashboard/major/MajorListHead";

// mock
import MajorFormAdd from "src/sections/@dashboard/major/MajorFormAdd";
import Popup from "src/sections/@dashboard/popup/Popup";
import MajorFormUpd from "src/sections/@dashboard/major/MajorFormUpd";
import { useEffect } from "react";
import { fetchMajor } from "src/reducers/majorSlice";
import { useDispatch, useSelector } from "react-redux";
import PopupDel from "src/sections/@dashboard/popup/PopupDel";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "majorName", label: "Tên ngành", alignRight: false },
	{ id: "deanName", label: "Trưởng khoa", alignRight: false },
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
			(_major) =>
				_major.majorName.toLowerCase().indexOf(query.toLowerCase()) !==
				-1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function MajorPage() {
	const dispatch = useDispatch();

	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [openPopupAdd, setOpenPopupAdd] = useState(false);
	const [openPopupUpd, setOpenPopupUpd] = useState(false);
	const [openPopupDel, setOpenPopupDel] = useState(false);

	const [recordForEdit, setRecordForEdit] = useState(null);

	useEffect(() => {
		dispatch(fetchMajor());
	}, []);
	const MAJORLIST = useSelector((state) => state.majorReducer).data;

	const handleOpenUpd = (row) => {
		setRecordForEdit(row);
		setOpenPopupUpd(true);
	};
	const handleOpenDel = (row) => {
		setRecordForEdit(row);
		setOpenPopupDel(true);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const filteredMajors = applySortFilter(
		MAJORLIST,
		getComparator(order, orderBy),
		filterName
	);

	return (
		<>
			<Helmet>
				<title>Quản lý ngành học</title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Ngành học
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={() => setOpenPopupAdd(true)}
					>
						Thêm ngành học mới
					</Button>
				</Stack>

				<Card>
					<MajorListToolbar
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<MajorListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{filteredMajors.length != 0 &&
										filteredMajors.map((row) => {
											const { id, majorName, deanName } =
												row;
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
																{majorName}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell align="left">
														{deanName}
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
				title="Thêm ngành học"
			>
				<MajorFormAdd />
			</Popup>
			<PopupDel
				openPopup={openPopupDel}
				setOpenPopup={setOpenPopupDel}
				title="Bạn muốn xóa ngành học này không?"
				type="major"
				data={recordForEdit}
			></PopupDel>

			<Popup
				openPopup={openPopupUpd}
				setOpenPopup={setOpenPopupUpd}
				title="Cập nhật ngành học"
			>
				<MajorFormUpd data={recordForEdit} setOpen={setOpenPopupUpd} />
			</Popup>
		</>
	);
}
