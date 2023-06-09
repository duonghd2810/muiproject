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
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import Popup from "src/sections/@dashboard/popup/Popup";
import UserFormAdd from "src/sections/@dashboard/user/UserFormAdd";
import UserFormUpd from "src/sections/@dashboard/user/UserFormUpd";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "src/reducers/studentSlice";
import PopupDel from "src/sections/@dashboard/popup/PopupDel";
import dayjs from "dayjs";
import { fetchMajor } from "src/reducers/majorSlice";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "fullName", label: "Tên", alignRight: false },
	{ id: "dateOfBirth", label: "Ngày sinh", alignRight: false },
	{ id: "phone", label: "Số điện thoại", alignRight: false },
	{ id: "email", label: "Email", alignRight: false },
	{ id: "gender", label: "Giới tính", alignRight: false },
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
			(_user) =>
				_user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function StudentPage() {
	const dispatch = useDispatch();

	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");
	const [openPopupAdd, setOpenPopupAdd] = useState(false);
	const [openPopupUpd, setOpenPopupUpd] = useState(false);
	const [openPopupDel, setOpenPopupDel] = useState(false);

	useEffect(() => {
		dispatch(fetchMajor());
	}, []);
	const dataSelect = useSelector((state) => state.majorReducer).data;
	const [recordForEdit, setRecordForEdit] = useState(null);
	useEffect(() => {
		dispatch(fetchStudent());
	}, []);
	const STUDENTLIST = useSelector((state) => state.studentReducer).data;

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};
	const handleOpenUpd = (row) => {
		setRecordForEdit(row);
		setOpenPopupUpd(true);
	};
	const handleOpenDel = (row) => {
		setRecordForEdit(row);
		setOpenPopupDel(true);
	};
	const filteredUsers = applySortFilter(
		STUDENTLIST,
		getComparator(order, orderBy),
		filterName
	);
	return (
		<>
			<Helmet>
				<title>Quản lý sinh viên</title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Sinh viên
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={() => setOpenPopupAdd(true)}
					>
						Thêm sinh viên mới
					</Button>
				</Stack>

				<Card>
					<UserListToolbar
						placeholder="Tìm kiếm sinh viên"
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<UserListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{filteredUsers.map((row) => {
										const {
											id,
											fullName,
											dateOfBirth,
											phone,
											email,
											gender,
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
													style={{ width: "20%" }}
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
															{fullName}
														</Typography>
													</Stack>
												</TableCell>

												<TableCell
													align="left"
													style={{ width: "15%" }}
												>
													{dayjs(dateOfBirth).format(
														"DD/MM/YYYY"
													)}
												</TableCell>

												<TableCell
													align="left"
													style={{ width: "18%" }}
												>
													{phone}
												</TableCell>

												<TableCell
													align="left"
													style={{ width: "25%" }}
												>
													{email}
												</TableCell>

												<TableCell
													align="left"
													style={{ width: "12%" }}
												>
													{gender}
												</TableCell>

												<TableCell
													align="right"
													style={{ width: "10%" }}
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
				title="Thêm sinh viên"
			>
				<UserFormAdd type="student" dataSelect={dataSelect} />
			</Popup>
			<PopupDel
				openPopup={openPopupDel}
				setOpenPopup={setOpenPopupDel}
				title="Bạn muốn xóa sinh viên này không?"
				type="user"
				data={recordForEdit}
			></PopupDel>
			<Popup
				openPopup={openPopupUpd}
				setOpenPopup={setOpenPopupUpd}
				title="Cập nhật sinh viên"
			>
				<UserFormUpd
					data={recordForEdit}
					setOpen={setOpenPopupUpd}
					type="student"
				/>
			</Popup>
		</>
	);
}
