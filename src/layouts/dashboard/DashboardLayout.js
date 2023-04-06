import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "src/reducers/userSlice";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
	display: "flex",
	minHeight: "100%",
	overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer);
	console.log("DashboardLayout -> user", user);

	const [open, setOpen] = useState(false);

	return (
		<StyledRoot>
			<Header onOpenNav={() => setOpen(true)} />

			<Nav openNav={open} onCloseNav={() => setOpen(false)} />

			<Main>
				<button
					onClick={async () => {
						const res = await dispatch(
							fetchUser({ username: "test", password: "123456" })
						).unwrap();
						console.log("DashboardLayout -> res", res);
					}}
				>
					Test Redux Toolkit
				</button>
				<Outlet />
			</Main>
		</StyledRoot>
	);
}
