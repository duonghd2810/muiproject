import {
	Button,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	TextField,
	styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "src/components/iconify/Iconify";
import { loadingActions } from "src/reducers/loadingSlice";
import request from "src/utils/request";
import * as Yup from "yup";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
function ChangePassword() {
	const dispatch = useDispatch();
	const refresh = () => window.location.reload(true);
	const user = useSelector((state) => state.userReducer).data;
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const formik = useFormik({
		initialValues: {
			oldPass: "",
			newpassword: "",
			password: "",
		},
		validationSchema: Yup.object({
			oldPass: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
			newpassword: Yup.string()
				.required("Vui lòng nhập mật khẩu mới")
				.min(8, "Mật khẩu tối thiểu 8 kí tự"),
			password: Yup.string()
				.required("Vui lòng nhập xác nhận mật khẩu")
				.oneOf(
					[Yup.ref("newpassword"), null],
					"Xác nhận mật khẩu không đúng"
				),
		}),
		onSubmit: async (values) => {
			try {
				const { newpassword, ...dataRequest } = values;
				dispatch(loadingActions.update(true));
				await request.patch(
					`user/changepass/${user.userId}`,
					JSON.stringify(dataRequest),
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				refresh();
			} catch (error) {
				alert(error.response.data.message);
			} finally {
				dispatch(loadingActions.update(false));
			}
		},
	});
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={formik.handleSubmit}>
				<FormControl style={{ margin: "12px 0" }}>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Mật khẩu cũ"
						type={showOldPassword ? "text" : "password"}
						name="oldPass"
						value={formik.values.oldPass}
						onChange={formik.handleChange}
						size="small"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() =>
											setShowOldPassword(!showOldPassword)
										}
										edge="end"
									>
										<Iconify
											icon={
												showOldPassword
													? "eva:eye-fill"
													: "eva:eye-off-fill"
											}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{formik.errors.oldPass && formik.touched.oldPass && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.oldPass}
						</p>
					)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Mật khẩu mới"
						type={showPassword ? "text" : "password"}
						name="newpassword"
						value={formik.values.newpassword}
						onChange={formik.handleChange}
						size="small"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() =>
											setShowPassword(!showPassword)
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
					{formik.errors.newpassword &&
						formik.touched.newpassword && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.newpassword}
							</p>
						)}
				</FormControl>
				<FormControl style={{ margin: "12px 0" }}>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Xác nhận mật khẩu mới"
						type={showConfirmPassword ? "text" : "password"}
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						size="small"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
										edge="end"
									>
										<Iconify
											icon={
												showConfirmPassword
													? "eva:eye-fill"
													: "eva:eye-off-fill"
											}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{formik.errors.password && formik.touched.password && (
						<p style={{ color: "red", margin: "4px 0" }}>
							{formik.errors.password}
						</p>
					)}
				</FormControl>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						type="submit"
						size="small"
						variant="contained"
						style={{ width: "160px" }}
					>
						Thay đổi mật khẩu
					</Button>
				</div>
			</GlobalForm>
		</Container>
	);
}

export default ChangePassword;
