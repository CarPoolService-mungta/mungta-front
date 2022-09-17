import {useCallback, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import {getQuestionById, deleteQuestionById} from 'api/question'
import ContentsCard from "./ContentsCard";
import {Box, Button, CircularProgress, Grid} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import DeleteCheckModal from "../../../components/@extended/DeleteCheckModal";

const Question = ()=>{
    const navigate = useNavigate();

    const {id} = useParams();

    const [question, setQuestion] = useState(null);
    const [response, setResponse] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(async ()=>{
        const result = await getQuestionById({id});
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
        await deleteQuestionById({id});
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
                <Button variant="contained" onClick={deleteCheckClick} color="error">삭제</Button>
            </Grid>
        </Grid>
        {question ?
            <ContentsCard contents={question}/> :
            <Box sx={{py: 3, minHeight: 560, alignContent: 'center'}}>
                <CircularProgress />
            </Box>
        }
        {response ? <ContentsCard contents={response}/> : <></>}
        <DeleteCheckModal modalOpen={deleteModalOpen} onCancel={deleteCancel} onOk={deleteConfirm}/>
    </>
}

export default Question;