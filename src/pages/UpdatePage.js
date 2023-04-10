import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomizedRadioGender from "src/theme/overrides/RadioGender";
const GlobalForm = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

function UpdatePage() {
     const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
     const formik = useFormik({
     initialValues: {
     fullName: "",
     dateOfBirth: "",
     phone: "",
     email: "",
     gender: "Nam",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập tên sinh viên"),
      dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(regexPhone, "Số điện thoại không hợp lệ"),
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Không đúng định dạng email"),
    }),
    onSubmit: (values) => {
      console.log(JSON.parse(JSON.stringify(values)));
      formik.handleReset();
    },
  });
  return (
    <Container maxWidth="sm">
          <GlobalForm onSubmit={formik.handleSubmit}>
               <FormControl style={{ margin: "12px 0" }}>
                    <InputLabel htmlFor="component-simple">Tên</InputLabel>
                    <Input
                    id="component-simple"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.fullName && formik.touched.fullName && (
                    <p style={{ color: "red", margin: "4px 0" }}>
                    {formik.errors.fullName}
                    </p>
                    )}
               </FormControl>
               <FormControl style={{ margin: "12px 0" }}>
                    <label for="" >Ảnh</label>
                    <Stack direction="row" alignItems="center" spacing={2}>
                         <Button variant="contained" component="label">
                         Upload
                         <input hidden accept="image/*" multiple type="file" />
                         </Button>
                         <IconButton color="primary" aria-label="upload picture" component="label">
                         <input hidden accept="image/*" type="file" />
                         </IconButton>
                    </Stack>
               </FormControl>
               <FormControl style={{ margin: "12px 0" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    name="dateOfBirth"
                    value={formik.values.dateOfBirth || null}
                    onChange={(value) => {
                         formik.setFieldValue("dateOfBirth", value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    label="Ngày sinh"
                    format="DD / MM / YYYY"
                    />
                    </LocalizationProvider>
                    {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                    <p style={{ color: "red", margin: "4px 0" }}>
                    {formik.errors.dateOfBirth}
                    </p>
                    )}
               </FormControl>
               <FormControl style={{ margin: "12px 0" }}>
                    <InputLabel htmlFor="component-simple">Số điện thoại</InputLabel>
                    <Input
                    id="component-simple"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                    <p style={{ color: "red", margin: "4px 0" }}>
                    {formik.errors.phone}
                    </p>
                    )}
               </FormControl>
               <FormControl style={{ margin: "12px 0" }}>
                    <InputLabel htmlFor="component-simple">Email</InputLabel>
                    <Input
                    id="component-simple"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                    <p style={{ color: "red", margin: "4px 0" }}>
                    {formik.errors.email}
                    </p>
                    )}
               </FormControl>
               <FormControl style={{ margin: "12px 0" }}>
                    <CustomizedRadioGender
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    />
               </FormControl>
               <Button type="submit" size="medium" variant="contained" style={{width:"150px"}}>
                    Cập nhật
               </Button>
          </GlobalForm>
    </Container>
  )
}

export default UpdatePage