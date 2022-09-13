import {useCallback, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import {getQuestionById, deleteQuestionById} from 'api/question'
import ContentsCard from "./ContentsCard";
import {Box, Button, CircularProgress, Grid} from "@mui/material";
import {LoadingButton} from '@material-ui/lab';
import {useNavigate} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteCheckModal from "components/@extended/DeleteCheckModal";
import CustomError from 'utils/CustomError'

const Question = ()=>{
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const {id} = useParams();

    const [question, setQuestion] = useState(null);
    const [response, setResponse] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(async ()=>{
        const result = await getQuestionById({id});
        if(result instanceof CustomError){
            enqueueSnackbar(response.message, {variant: 'error'});
            return;
        }
        setQuestion(result.question);
        setResponse(result.response);
    },[id])

    const goBackList=()=>{
        navigate(`/questions`);
    }

    const deleteCheckClick=()=>{
        setDeleteModalOpen(true);
    }

    const deleteConfirm = async ()=>{
        setDeleteLoading(true);
        const result = await deleteQuestionById({id});
        if(result instanceof CustomError){
            enqueueSnackbar(result.message, {variant: 'error'});
            return;
        }
        enqueueSnackbar('문의가 삭제되었습니다.', {variant: 'success'});
        setDeleteLoading(false);
        setDeleteModalOpen(false);
        navigate(`/questions`);
    }

    const deleteCancel = ()=>{
        setDeleteModalOpen(false);
    }

    return <>
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            spacing={2}>
            <Grid item>
                <Button variant="outlined" onClick={goBackList}>목록</Button>
            </Grid>
            <Grid item>
                <LoadingButton variant="contained" onClick={deleteCheckClick} color="error" loading={deleteModalOpen}>삭제</LoadingButton>
            </Grid>
        </Grid>
        {question ?
            <ContentsCard contents={question}/> :
            <Box sx={{py: 3, minHeight: 560, alignContent: 'center'}}>
                <CircularProgress />
            </Box>
        }
        {response ? <ContentsCard contents={response}/> : <></>}
        <DeleteCheckModal modalOpen={deleteModalOpen}
                          onCancel={deleteCancel}
                          onOk={deleteConfirm}
                          deleteLoading={deleteLoading}/>
    </>
}

export default Question;