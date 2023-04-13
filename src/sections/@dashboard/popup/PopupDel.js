import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchMajor } from "src/reducers/majorSlice";
import { fetchStudent } from "src/reducers/studentSlice";
import request from "src/utils/request";

function PopupDel(props) {
	const dispatch = useDispatch();
	const { openPopup, setOpenPopup, title, type, data } = props;

	const handleDelete = async () => {
		await request.delete(`${type}/${data.id}`);
		setOpenPopup(false);
		if (type == "major") {
			dispatch(fetchMajor());
		}
		if (type == "user") {
			dispatch(fetchStudent());
		}
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
