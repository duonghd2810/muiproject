import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, FormControl, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import request from "src/utils/request";
import dayjs from "dayjs";
import Popup from "src/sections/@dashboard/popup/Popup";
import ChangePassword from "src/sections/@dashboard/user/ChangePassword";
import { loadingActions } from "src/reducers/loadingSlice";
const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function UpdatePage() {
	const dispatch = useDispatch();
	const refresh = () => window.location.reload(true);
	const user = useSelector((state) => state.userReducer).data;
	const [userUpd, setUserUpd] = useState({});
	const [openForm, setOpenForm] = useState(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const fetchData = async () => {
			dispatch(loadingActions.update(true));
			const response = await request.get(`user/${user.userId}`);
			return response.data.result;
		};
		fetchData().then((res) => {
			setUserUpd(res);
			dispatch(loadingActions.update(false));
		});
	}, []);
	const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			fullName: userUpd.fullName,
			username: userUpd.username,
			dateOfBirth: dayjs(userUpd.dateOfBirth),
			gender: userUpd.gender,
			address: userUpd.address,
			phone: userUpd.phone,
			email: userUpd.email,
		},
		validationSchema: Yup.object({
			address: Yup.string().required("Vui lòng nhập địa chỉ"),
			phone: Yup.string()
				.required("Vui lòng nhập số điện thoại")
				.matches(regexPhone, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Vui lòng nhập email")
				.email("Không đúng định dạng email"),
		}),
		onSubmit: async (values) => {
			await request.patch(`user/${user.userId}`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			refresh();
		},
	});
	return (
		<>
			<Helmet>
				<title>Cập nhật thông tin</title>
			</Helmet>

			<Container maxWidth="sm">
				<GlobalForm onSubmit={formik.handleSubmit}>
					<FormControl style={{ margin: "12px 0" }}>
						<TextField
							InputLabelProps={{ shrink: true }}
							label="Tên"
							id="outlined-basic"
							variant="outlined"
							type="text"
							name="fullName"
							value={formik.values.fullName}
							size="small"
							readOnly
							disabled
						/>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<TextField
							InputLabelProps={{ shrink: true }}
							label="Tên đăng nhập"
							id="outlined-basic"
							variant="outlined"
							type="text"
							name="username"
							value={formik.values.username}
							size="small"
							readOnly
							disabled
						/>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<label
							style={{
								color: "#919EAB",
								fontSize: "1rem",
								lineHeight: "1.4375em",
							}}
						>
							Mật khẩu
						</label>
						<Button
							size="small"
							style={{ width: "120px", fontWeight: "400" }}
							onClick={() => setOpenForm(true)}
						>
							Đổi mật khẩu
						</Button>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								name="dateOfBirth"
								value={formik.values.dateOfBirth}
								size="small"
								renderInput={(params) => (
									<TextField {...params} />
								)}
								InputLabelProps={{ shrink: true }}
								label="Ngày sinh"
								format="DD / MM / YYYY"
								readOnly
								disabled
							/>
						</LocalizationProvider>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<TextField
							InputLabelProps={{ shrink: true }}
							label="Giới tính"
							id="outlined-basic"
							variant="outlined"
							type="text"
							name="gender"
							value={formik.values.gender}
							size="small"
							readOnly
							disabled
						/>
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<TextField
							InputLabelProps={{ shrink: true }}
							label="Địa chỉ"
							id="outlined-basic"
							variant="outlined"
							type="text"
							name="address"
							value={formik.values.address}
							onChange={formik.handleChange}
							size="small"
						/>
						{formik.errors.address && formik.touched.address && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.address}
							</p>
						)}
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<TextField
							InputLabelProps={{ shrink: true }}
							label="Số điện thoại"
							id="outlined-basic"
							variant="outlined"
							type="text"
							name="phone"
							value={formik.values.phone}
							onChange={formik.handleChange}
							size="small"
						/>
						{formik.errors.phone && formik.touched.phone && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.phone}
							</p>
						)}
					</FormControl>
					<FormControl style={{ margin: "12px 0" }}>
						<TextField
							InputLabelProps={{ shrink: true }}
							label="Email"
							id="outlined-basic"
							variant="outlined"
							type="text"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							size="small"
						/>
						{formik.errors.email && formik.touched.email && (
							<p style={{ color: "red", margin: "4px 0" }}>
								{formik.errors.email}
							</p>
						)}
					</FormControl>
					<Button
						type="submit"
						size="medium"
						variant="contained"
						style={{ width: "150px" }}
					>
						Cập nhật
					</Button>
				</GlobalForm>
			</Container>
			<Popup
				openPopup={openForm}
				setOpenPopup={setOpenForm}
				title="Thay đổi mật khẩu"
			>
				<ChangePassword />
			</Popup>
		</>
	);
}

export default UpdatePage;
