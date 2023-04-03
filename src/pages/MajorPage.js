import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState } from "react";
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
// section
import MajorListToolbar from "src/sections/@dashboard/major/MajorListToolbar";
import MajorListHead from "src/sections/@dashboard/major/MajorListHead";

// mock
import MAJORLIST from "../_mock/major";
import MajorFormAdd from "src/sections/@dashboard/major/MajorFormAdd";
import Popup from "src/sections/@dashboard/popup/Popup";
import MajorFormUpd from "src/sections/@dashboard/major/MajorFormUpd";

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
	const [open, setOpen] = useState(null);

	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [openPopupAdd, setOpenPopupAdd] = useState(false);
	const [openPopupUpd, setOpenPopupUpd] = useState(false);

	const [recordForEdit,setRecordForEdit] = useState(null);

	const handleOpenMenu = (event,row) => {
		setRecordForEdit(row);
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
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

	const isNotFound = !filteredMajors.length && !!filterName;

	return (
		<>
			<Helmet>
				<title>Major page</title>
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
									{filteredMajors.map((row) => {
										const { id, majorName, deanName } = row;
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
												<TableCell align="right">
													<IconButton
														size="large"
														color="inherit"
														onClick={(e)=>handleOpenMenu(e,row)}
													>
														<Iconify
															icon={
																"eva:more-vertical-fill"
															}
														/>
													</IconButton>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>

								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell
												align="center"
												colSpan={6}
												sx={{ py: 3 }}
											>
												<Paper
													sx={{
														textAlign: "center",
													}}
												>
													<Typography
														variant="h6"
														paragraph
													>
														Not found
													</Typography>

													<Typography variant="body2">
														Không có kết quả tìm
														kiếm cho &nbsp;
														<strong>
															&quot;{filterName}
															&quot;
														</strong>
													</Typography>
												</Paper>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			</Container>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 1,
						width: 140,
						"& .MuiMenuItem-root": {
							px: 1,
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<MenuItem onClick={()=>setOpenPopupUpd(true)}>
					<Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
					Edit
				</MenuItem>

				<MenuItem sx={{ color: "error.main" }}>
					<Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Popover>
			<Popup
				openPopup={openPopupAdd}
				setOpenPopup={setOpenPopupAdd}
				title="Thêm ngành học"
			>
				<MajorFormAdd />
			</Popup>
			<Popup
				openPopup={openPopupUpd}
				setOpenPopup={setOpenPopupUpd}
				title="Cập nhật ngành học"
			>
				<MajorFormUpd data={recordForEdit} />
			</Popup>
		</>
	);
}
