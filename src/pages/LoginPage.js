import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
// hooks
import { useFormik } from "formik";
import * as Yup from "yup";
// components
import Logo from "../components/logo";
import { useState } from "react";
import Iconify from "../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "src/reducers/userSlice";
import { isEmpty } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import Popup from "src/sections/@dashboard/popup/Popup";
import ForgotPassPage from "src/sections/@dashboard/user/ForgotPassPage";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("md")]: {
		display: "flex",
	},
}));

const StyledContent = styled("div")(({ theme }) => ({
	maxWidth: 480,
	margin: "auto",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItems: "center",
	padding: theme.spacing(12, 0),
}));
const StyledWrapper = styled("div")(({ theme }) => ({
	padding: "16px 0",
	width: "25em",
	height: "25em",
	border: "1px solid #ccc",
	borderRadius: "5px",
	boxShadow: "0 2px 5px 1px rgb(100, 156, 156)",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-around",
}));
const FormLogin = styled("form")(({ theme }) => ({
	flex: "3",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between",
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
	const dispatch = useDispatch();
	const history = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Username is required"),
			password: Yup.string().required("Password is required"),
		}),
		onSubmit: async (values) => {
			dispatch(fetchUser(values));
		},
	});
	const user = useSelector((state) => state.userReducer).data;
	return isEmpty(user) ? (
		<>
			<Helmet>
				<title>Đăng nhập</title>
			</Helmet>

			<StyledRoot>
				<Logo
					sx={{
						position: "fixed",
						top: { xs: 16, sm: 24, md: 40 },
						left: { xs: 16, sm: 24, md: 40 },
					}}
				/>
				<Container maxWidth="sm">
					<StyledContent>
						<StyledWrapper>
							<h2 style={{ fontSize: "1.8rem", flex: "1" }}>
								Đăng Nhập
							</h2>
							<FormLogin onSubmit={formik.handleSubmit}>
								<TextField
									label="Tên đăng nhập"
									id="outlined-basic"
									variant="outlined"
									type="text"
									size="small"
									name="username"
									value={formik.values.username}
									onChange={formik.handleChange}
									required
									style={{
										marginBottom: "24px",
										width: "60%",
									}}
								/>
								<TextField
									label="Mật khẩu"
									id="outlined-basic"
									variant="outlined"
									name="password"
									type={showPassword ? "text" : "password"}
									size="small"
									value={formik.values.password}
									onChange={formik.handleChange}
									required
									style={{
										marginBottom: "24px",
										width: "60%",
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
													edge="end"
												>
													<Iconify
														icon={
															showPassword
																? "eva:eye-fill"
																: "eva:eye-off-fill"
														}
													/>
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<Link
									to="#"
									className="bs-text-primary"
									onClick={(event) => {
										event.preventDefault();
										setIsOpenPopup(true);
									}}
								>
									Quên mật khẩu
								</Link>
								<Button
									style={{ marginTop: "24px" }}
									type="submit"
									size="small"
									variant="contained"
								>
									Đăng nhập
								</Button>
							</FormLogin>
						</StyledWrapper>
					</StyledContent>
					<Popup
						title="Lấy lại mật khẩu mới"
						openPopup={isOpenPopup}
						setOpenPopup={setIsOpenPopup}
					>
						<ForgotPassPage setOpenPopup={setIsOpenPopup} />
					</Popup>
				</Container>
			</StyledRoot>
		</>
	) : (
		history("/", { replace: true })
	);
}
