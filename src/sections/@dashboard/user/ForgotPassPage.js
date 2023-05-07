import {
	Button,
	Container,
	FormControl,
	TextField,
	styled,
} from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/iconify/Iconify";
import request from "src/utils/request";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

function ForgotPassPage({ setOpenPopup }) {
	const [username, setUsername] = useState("");
	const handleSubmit = async () => {
		await request.patch(`user/forgotpass`, JSON.stringify(username), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		setOpenPopup(false);
	};
	return (
		<Container fixed style={{ margin: "12px 0" }}>
			<GlobalForm onSubmit={handleSubmit}>
				<FormControl style={{ margin: "12px 0" }}>
					<TextField
						InputLabelProps={{ shrink: true }}
						label="Username"
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						size="small"
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
