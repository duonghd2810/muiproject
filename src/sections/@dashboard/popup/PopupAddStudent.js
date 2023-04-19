import {
	AppBar,
	Button,
	Dialog,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";

function PopupAddStudent(props) {
	const { openPopup, setOpenPopup, data } = props;
	const handleClose = () => {
		setOpenPopup(false);
	};
	return (
		<Dialog fullScreen open={openPopup}>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant="h6"
						component="div"
					>
						Ngành {!!data && data.majorName}
					</Typography>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<Button color="error" onClick={handleClose}>
							X
						</Button>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Typography
				variant="h5"
				gutterBottom
				style={{ margin: "0", padding: "0 18px" }}
			>
				Danh sách sinh viên
			</Typography>
			<List>
				<ListItem>
					<ListItemText primary="Phone ringtone" />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary="Default notification ringtone" />
				</ListItem>
			</List>
		</Dialog>
	);
}

export default PopupAddStudent;
