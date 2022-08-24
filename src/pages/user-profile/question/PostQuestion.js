import MainCard from "../../../components/MainCard";
import {Form, useFormik} from "formik";

import * as Yup from 'yup';
import {TextField, Button, Grid} from "@mui/material";

const PostQuestion = ()=>{

    const formik = useFormik({
        initialValues: {
            title:"",
            body:"1223"
        },
        validationSchema:Yup.object().shape({
            title: Yup.string()
                .required("제목을 입력해주세요."),
            body: Yup.string()
                .required("문의사항을 입력해주세요.")
        }),
        onSubmit: (values)=>{
            console.log("values : ", values);
        },
    });
    return <>
        <MainCard darkTitle={true} title={"문의하기"}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    justifyContent="flex-start"
                    spacing={2}
                    style={{marginTop:5, marginBottom:5}}>
                    <Grid item xs={12}>
                        <TextField name="title" label="제목" fullWidth/>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justifyContent="flex-start"
                    spacing={2}
                    style={{ marginBottom:5}}>
                    <Grid item xs={12}>
                        <TextField name="body" label="내용" multiline rows={5} fullWidth/>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justifyContent="flex-end"
                    direction="row"
                    spacing={2}>
                    <Grid item>
                        <Button variant="contained" type="submit" onSubmit={()=>handleSubmit()}>
                            제출
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    </>
}

export default PostQuestion