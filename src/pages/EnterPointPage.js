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
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { fetchMajor } from "src/reducers/majorSlice";

function EnterPointPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMajor());
	}, []);
	const MAJORLIST = useSelector((state) => state.majorReducer).data;
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
								<TableBody>
									{MAJORLIST.length != 0 &&
										MAJORLIST.map((row) => {
											const { id, majorName } = row;
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
