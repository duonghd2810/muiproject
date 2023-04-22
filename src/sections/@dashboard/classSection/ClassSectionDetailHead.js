import { TableRow, TableCell, TableHead } from "@mui/material";

function ClassSectionDetailHead() {
	return (
		<TableHead>
			<TableRow>
				<TableCell align="center" rowSpan={2} style={{ width: "15%" }}>
					Mã sinh viên
				</TableCell>
				<TableCell align="center" rowSpan={2} style={{ width: "25%" }}>
					Tên sinh viên
				</TableCell>
				<TableCell align="center" colSpan={5} style={{ width: "25%" }}>
					Điểm thường xuyên
				</TableCell>
				<TableCell align="center" rowSpan={2} style={{ width: "10%" }}>
					TB KTTX
				</TableCell>
				<TableCell align="center" rowSpan={2} style={{ width: "10%" }}>
					Số tiết nghỉ
				</TableCell>
				<TableCell align="center" rowSpan={2} style={{ width: "15%" }}>
					Điều kiện dự thi
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell align="center">1</TableCell>
				<TableCell align="center">2</TableCell>
				<TableCell align="center">3</TableCell>
				<TableCell align="center">4</TableCell>
				<TableCell align="center">5</TableCell>
			</TableRow>
		</TableHead>
	);
}

export default ClassSectionDetailHead;
