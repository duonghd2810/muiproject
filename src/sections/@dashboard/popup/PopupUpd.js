import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchClassSection } from "src/reducers/classSectionSlice";
import request from "src/utils/request";

function PopupUpd(props) {
	const dispatch = useDispatch();
	const { openPopup, setOpenPopup, title, type, data, teacher } = props;

	const handleUpdate = async () => {
		await request.patch(`${type}/${data.id}/teacher/${teacher}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch(fetchClassSection());
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
					<Button color="success" onClick={handleUpdate}>
						Cập nhật
					</Button>
					<Button color="error" onClick={() => setOpenPopup(false)}>
						Hủy
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default PopupUpd;
