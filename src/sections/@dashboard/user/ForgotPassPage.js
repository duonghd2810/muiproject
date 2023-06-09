import {
	Button,
	Container,
	FormControl,
	TextField,
	styled,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingActions } from "src/reducers/loadingSlice";
import request from "src/utils/request";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function ForgotPassPage({ setOpenPopup }) {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			dispatch(loadingActions.update(true));
			await request.patch(`user/forgotpass`, JSON.stringify(username), {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setOpenPopup(false);
			setUsername("");
			alert(
				"Hệ thống đã cập nhật mật khẩu mới. Vui lòng vào email để kiểm tra!"
			);
		} catch (error) {
			alert(error.response.data.message);
		} finally {
			dispatch(loadingActions.update(false));
		}
	};
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={(e) => handleSubmit(e)}>
				<FormControl style={{ margin: "12px 0" }}>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Username"
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						size="small"
						required
					/>
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
						Gửi
					</Button>
				</div>
			</GlobalForm>
		</Container>
	);
}

export default ForgotPassPage;
