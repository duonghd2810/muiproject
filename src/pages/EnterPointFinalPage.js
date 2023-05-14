import { useState } from "react";
import { Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import request from "src/utils/request";
import { Helmet } from "react-helmet-async";

const StyledDiv = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
}));
const FileForm = styled("form")(({ theme }) => ({
	width: "50%",
	height: "250px",
	borderRadius: "5px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	border: "1px dashed #1475cf",
	cursor: "pointer",
}));
function EnterPointFinalPage() {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileSelect = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const handleUploadFinalPoint = () => {
		const formData = new FormData();
		formData.append("file", selectedFile);

		request
			.post("coursegrade/final-point", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				alert(response.data.Message);
			})
			.catch((error) => {
				alert(error.response.data.message);
			});
		setSelectedFile(null);
	};
	return (
		<>
			<Helmet>
				<title>Nhập điểm cuối kỳ</title>
			</Helmet>
			<Container>
				<StyledDiv>
					<FileForm
						onClick={() =>
							document.querySelector(".input-field").click()
						}
					>
						<input
							className="input-field"
							style={{ flex: "2" }}
							type="file"
							onChange={handleFileSelect}
							hidden
						/>
						<Icon
							icon="material-symbols:cloud-upload"
							width={80}
							style={{ color: "#1475cf" }}
						/>
					</FileForm>
					<div>
						<span>{selectedFile?.name}</span>
					</div>
					<Button
						variant="contained"
						onClick={handleUploadFinalPoint}
						style={{ marginTop: "10px" }}
					>
						Nhập điểm cuối kỳ
					</Button>
				</StyledDiv>
			</Container>
		</>
	);
}

export default EnterPointFinalPage;
