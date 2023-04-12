import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useEffect, useState } from "react";
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
// sections

// mock
import Popup from "src/sections/@dashboard/popup/Popup";
import {
	SubjectListToolbar,
	SubjectListHead,
	SubjectFormAdd,
	SubjectFormUpd,
} from "../sections/@dashboard/subject";
import PopupDel from "src/sections/@dashboard/popup/PopupDel";
import request from "src/utils/request";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "subjectName", label: "Tên môn", alignRight: false },
	{ id: "tc", label: "Số tín chỉ", alignRight: false },
	{ id: "price", label: "Giá tiền/tín chỉ", alignRight: false },
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
			(_subject) =>
				_subject.subjectName
					.toLowerCase()
					.indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}
function SubjectPage() {
	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");
	const [openPopupAdd, setOpenPopupAdd] = useState(false);
	const [openPopupUpd, setOpenPopupUpd] = useState(false);
	const [openPopupDel, setOpenPopupDel] = useState(false);

	const [recordForEdit, setRecordForEdit] = useState(null);
	const [subjects, setSubject] = useState([]);

	useEffect(() => {
		request.get("subject").then((res) => setSubject(res.data.result));
	}, []);
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const filteredSubjects = applySortFilter(
		subjects,
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
				<title>Quản lý môn học</title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Môn học
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={() => setOpenPopupAdd(true)}
					>
						Thêm môn học mới
					</Button>
				</Stack>

				<Card>
					<SubjectListToolbar
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<SubjectListHead
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
												subjectName,
												tc,
												price,
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
																{subjectName}
															</Typography>
														</Stack>
													</TableCell>

													<TableCell align="left">
														{tc}
													</TableCell>
													<TableCell align="left">
														{price}
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
				title="Thêm môn học"
			>
				<SubjectFormAdd />
			</Popup>
			<PopupDel
				openPopup={openPopupDel}
				setOpenPopup={setOpenPopupDel}
				title="Bạn muốn xóa môn học này không?"
				type="subject"
				data={recordForEdit}
			></PopupDel>
			<Popup
				openPopup={openPopupUpd}
				setOpenPopup={setOpenPopupUpd}
				title="Cập nhật môn học"
			>
				<SubjectFormUpd
					data={recordForEdit}
					setOpen={setOpenPopupUpd}
				/>
			</Popup>
		</>
	);
}

export default SubjectPage;
