import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

function CalendarclPage() {
	return <>
		<Helmet>
			<title>Đăng ký học phần</title>
		</Helmet>
		<Container>
			<Typography variant="h4" gutterBottom>
				Thời khóa biểu
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Thời khóa biểu</TableCell>
							<TableCell align="right">Thứ 2</TableCell>
							<TableCell align="right">Thứ 3</TableCell>
							<TableCell align="right">Thứ 4</TableCell>
							<TableCell align="right">Thứ 5</TableCell>
							<TableCell align="right">Thứ 6</TableCell>
							<TableCell align="right">Thứ 7</TableCell>
							<TableCell align="right">Chủ nhật</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								Sáng
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								Chiều
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								Tối
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
							<TableCell align="right">
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	</>;
}

export default CalendarclPage;
