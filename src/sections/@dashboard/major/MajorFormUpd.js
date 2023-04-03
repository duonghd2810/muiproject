import React from 'react';
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Button, Container, FormControl, Input, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";

const GlobalForm = styled("form")(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));
MajorFormUpd.propTypes = {
     props: PropTypes.object
}
function MajorFormUpd(props) {
          const {data} = props;
          const formik = useFormik({
		initialValues: {
			tennganh: data.majorName,
			truongkhoa: data.deanName,
		},
		validationSchema: Yup.object({
			tennganh: Yup.string().required("Tên ngành phải được nhập"),
			truongkhoa: Yup.string().required("Trưởng khoa phải được nhập"),
		}),
		onSubmit: (values) => {
			formik.handleReset();
			console.log(values);
		},
	});
          return (
                    <Container fixed style={{ margin: "12px 0" }}>
                              <GlobalForm onSubmit={formik.handleSubmit}>
                                        <FormControl style={{ margin: "12px 0" }}>
                                                  <InputLabel htmlFor="component-simple">
                                                            Tên ngành
                                                  </InputLabel>
                                                  <Input
                                                            id="component-simple"
                                                            name="tennganh"
                                                            value={formik.values.tennganh}
                                                            onChange={formik.handleChange}
                                                  />
                                                  {formik.errors.tennganh && formik.touched.tennganh && (
                                                            <p style={{ color: "red", margin: "4px 0" }}>
                                                                      {formik.errors.tennganh}
                                                            </p>
                                                  )}
                                        </FormControl>
                                        <FormControl style={{ margin: "12px 0" }}>
                                                  <InputLabel htmlFor="component-simple">
                                                            Trưởng khoa
                                                  </InputLabel>
                                                  <Input
                                                            id="component-simple"
                                                            name="truongkhoa"
                                                            value={formik.values.truongkhoa}
                                                            onChange={formik.handleChange}
                                                  />
                                                  {formik.errors.truongkhoa && formik.touched.truongkhoa && (
                                                            <p style={{ color: "red", margin: "4px 0" }}>
                                                                      {formik.errors.truongkhoa}
                                                            </p>
                                                  )}
                                        </FormControl>
                                        <Button type="submit" size="small" variant="contained">
                                                  Cập nhật
                                        </Button>
                              </GlobalForm>
                    </Container>
          )
}

export default MajorFormUpd