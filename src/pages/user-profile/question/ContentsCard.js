import MainCard from 'components/MainCard';
import {Typography} from "@mui/material";

const ContentsCard = ({contents})=>{

    console.log("contents : ", contents.title);
    return <>
        {contents.title ?
            <MainCard darkTitle={true} title={contents.title} >
                <Typography variant="body2">
                    {contents.body}
                </Typography>
            </MainCard>
            : <></>}
    </>
}

export default ContentsCard