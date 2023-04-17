import { useState } from "react";
// @mui
import { Divider, Stack, MenuItem, IconButton, Popover } from "@mui/material";
// mocks_
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { userActions } from "src/reducers/userSlice";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: "Cập nhật thông tin",
	},
];
const AvatarHead = styled("div")(({ theme }) => ({
	width: "45px",
	height: "45px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "50%",
	background: "#ccc",
}));
// ----------------------------------------------------------------------

export default function AccountPopover() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};
	const handleLogout = () => {
		dispatch(userActions.update({}));
		setOpen(null);
	};
	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							position: "absolute",
						},
					}),
				}}
			>
				<AvatarHead>
					<span style={{ color: "white" }}>HD</span>
				</AvatarHead>
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						"& .MuiMenuItem-root": {
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<Divider sx={{ borderStyle: "dashed" }} />

				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem key={option.label} onClick={handleClose}>
							<Link
								to="/profile"
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
							>
								{option.label}
							</Link>
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{ borderStyle: "dashed" }} />

				<MenuItem onClick={handleLogout} sx={{ m: 1 }}>
					Logout
				</MenuItem>
			</Popover>
		</>
	);
}
