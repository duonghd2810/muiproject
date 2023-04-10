import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

function StudyResultPage() {
	return (
		<>
			<Helmet>
				<title>Kết quả học tập</title>
			</Helmet>
			<Container>
				<Typography variant="h4" gutterBottom>
					Kết quả học tập các học phần
				</Typography>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell rowSpan={2}>STT</TableCell>
								<TableCell align="center" rowSpan={2}>
									Học phần
								</TableCell>
								<TableCell align="center" rowSpan={2}>
									Số tín chỉ
								</TableCell>
								<TableCell align="center" rowSpan={2}>
									TX1
								</TableCell>
								<TableCell align="center" rowSpan={2}>
									TX2
								</TableCell>
								<TableCell align="center" rowSpan={2}>
									TB KTTX
								</TableCell>
								<TableCell align="center" colSpan={2}>
									Điểm thi
								</TableCell>
								<TableCell align="center" colSpan={3}>
									Trung bình môn
								</TableCell>
								<TableCell align="right" rowSpan={2}>
									Xếp loại
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">Lần 1</TableCell>
								<TableCell align="center">Lần 2</TableCell>
								<TableCell align="center">Điểm 10</TableCell>
								<TableCell align="center">Điểm 4</TableCell>
								<TableCell align="center">Điểm chữ</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell component="th"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
}

export default StudyResultPage;
