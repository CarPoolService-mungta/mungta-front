import MainCard from "../../../components/MainCard";
import {Form, useFormik, FormikProvider} from "formik";

import * as Yup from 'yup';
import {TextField, Button, Grid} from "@mui/material";
import {postQuestionById } from 'api/question'

const PostQuestion = ()=>{

    const formik = useFormik({
        initialValues: {
            title:"",
            body:""
        },
        validationSchema:Yup.object().shape({
            title: Yup.string()
                .required("제목을 입력해주세요."),
            body: Yup.string()
                .required("문의사항을 입력해주세요.")
        }),
        onSubmit: async (values, { setSubmitting})=>{

            setSubmitting(true);

            console.log("values : ", values);
            // Todo 수정 필요
            const questionRegisterRequest = {
                userId: 0,
                question:{
                    title: values.title,
                    body: values.body
                }
            };

            console.log("questionRegisterRequest : ", questionRegisterRequest);

            const response = await postQuestionById(questionRegisterRequest);

            //api
            setSubmitting(false);
        },
    });

    const {
        values,
        errors,
        touched,
        handleSubmit,
        getFieldProps,
        setFieldValue,
    } = formik;

    return <>
        <MainCard darkTitle={true} title={"문의하기"}>
            <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                    <Grid
                        container
                        justifyContent="flex-start"
                        spacing={2}
                        style={{marginTop:5, marginBottom:5}}>
                        <Grid item xs={12}>
                            <TextField name="title"
                                       label="제목"
                                       fullWidth
                                       {...getFieldProps('title')}
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={(touched.title && errors.title)}/>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="flex-start"
                        spacing={2}
                        style={{ marginBottom:5}}>
                        <Grid item xs={12}>
                            <TextField name="body"
                                       label="내용"
                                       multiline
                                       rows={5}
                                       fullWidth
                                       {...getFieldProps('body')}
                                       error={Boolean(touched.body && errors.body)}
                                       helperText={(touched.body && errors.body)} />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="flex-end"
                        direction="row"
                        spacing={2}>
                        <Grid item>
                            <Button variant="contained"
                                    type="submit">
                                제출
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </MainCard>
    </>
}

export default PostQuestion