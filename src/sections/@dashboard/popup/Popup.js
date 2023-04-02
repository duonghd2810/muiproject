import {
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
	Typography,
} from "@mui/material";
import React from "react";

function Popup(props) {
	const { title, children, openPopup, setOpenPopup } = props;
	return (
		<Dialog open={openPopup} fullWidth>
			<DialogTitle style={{ paddingBottom: "0" }}>
				<div style={{ display: "flex" }}>
					<Typography
						variant="h4"
						gutterBottom
						style={{ flexGrow: "1", margin: "0" }}
					>
						{title}
					</Typography>
					<Button color="error" onClick={() => setOpenPopup(false)}>
						X
					</Button>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default Popup;
