import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassSectionRegistedByStudent } from "src/reducers/alllClassSectionRegistedByStudent";
import { fetchClassSection } from "src/reducers/classSectionSlice";
import { fetchMajor } from "src/reducers/majorSlice";
import { fetchStudent } from "src/reducers/studentSlice";
import { fetchSubject } from "src/reducers/subjectSlice";
import request from "src/utils/request";

function PopupDel(props) {
	const dispatch = useDispatch();
	const { openPopup, setOpenPopup, title, type, data } = props;

	const user = useSelector((state) => state.userReducer).data;

	const handleDelete = async () => {
		if (type === "cancel-registed") {
			await request.delete(
				`coursegrade/${user.userId}/${type}/${data.idClass}`
			);
			dispatch(fetchClassSectionRegistedByStudent(user.userId));
			setOpenPopup(false);
		}
		await request.delete(`${type}/${data.id}`);
		if (type === "major") {
			dispatch(fetchMajor());
		}
		if (type === "user") {
			dispatch(fetchStudent());
		}
		if (type === "subject") {
			dispatch(fetchSubject());
		}
		if (type === "classsection") {
			dispatch(fetchClassSection());
		}
		setOpenPopup(false);
	};
	return (
		<Dialog open={openPopup} fullWidth>
			<DialogTitle
				style={{
					paddingBottom: "0",
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<Button color="error" onClick={() => setOpenPopup(false)}>
					X
				</Button>
			</DialogTitle>
			<DialogContent>
				<Typography
					variant="h5"
					gutterBottom
					style={{ flexGrow: "1", margin: "0" }}
				>
					{title}
				</Typography>
				<div
					style={{
						marginTop: "8px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Button color="success" onClick={handleDelete}>
						Xóa
					</Button>
					<Button color="error" onClick={() => setOpenPopup(false)}>
						Hủy
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default PopupDel;
