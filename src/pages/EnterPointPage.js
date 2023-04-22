import {
	Card,
	Container,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { fetchClassSectionByTeacher } from "src/reducers/classSectionByTeacherSlice";
import ClassSectionListHead from "src/sections/@dashboard/classSection/ClassSectionListHead";
const TABLE_HEAD = [
	{ id: "subjectCode", label: "Mã HP", alignRight: false },
	{ id: "tenHp", label: "Tên HP", alignRight: false },
	{ id: "soTc", label: "Số tín chỉ", alignRight: false },
];
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
function EnterPointPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");
	const user = useSelector((state) => state.userReducer).data;
	useEffect(() => {
		dispatch(fetchClassSectionByTeacher(user.userId));
	}, []);
	const CLASSSECTIONTLIST = useSelector(
		(state) => state.classSectionByTeacherReducer
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
	const handleDetail = (id) => {
		navigate(`/enterpoint/${id}`);
	};
	return (
		<>
			<Helmet>
				<title>Nhập điểm</title>
			</Helmet>
			<Container>
				<Typography variant="h4" gutterBottom>
					Nhập điểm học phần
				</Typography>
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
									{filteredClassSections.length > 0 &&
										filteredClassSections.map((row) => {
											const {
												id,
												subjectCode,
												tenHp,
												soTc,
											} = row;
											return (
												<TableRow
													hover
													key={id}
													tabIndex={-1}
													style={{
														cursor: "pointer",
													}}
													onClick={() =>
														handleDetail(row.id)
													}
												>
													<TableCell
														component="th"
														scope="row"
														style={{
															cursor: "pointer",
														}}
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
														style={{
															cursor: "pointer",
														}}
													>
														{tenHp}
													</TableCell>
													<TableCell
														style={{
															cursor: "pointer",
														}}
													>
														{soTc}
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

export default EnterPointPage;
