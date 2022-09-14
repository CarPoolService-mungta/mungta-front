import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getInitials } from 'utils/get-initials';

const MemberInfoTable = ({ data, isLoading }) => {
    const members = data.members;

    const navigate = useNavigate();

    const registerBtnClick = useCallback((e, member, data) => {
        navigate('/register-accusation', {
            state: {
                accusedMember: {
                    id: member.id,
                    name: member.name,
                    email: member.email
                },
                partyInfo: {
                    partyId: data.partyId,
                    placeOfDeparture: data.placeOfDeparture,
                    destination: data.destination,
                    startedDateTime: data.startedDateTime
                }
            }
        });
    },[])

    return (
    <>
    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
            <TableHead style={{backgroundColor: '#F3F4F6'}}>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>아이디</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>부서</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading ? members && members
            .slice(0, 10)
            .map((member) => {
                return (
                    <TableRow
                    hover
                    key={member.id}
                    >
                        <TableCell></TableCell>
                        <TableCell>
                            <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                                <Avatar
                                alt={getInitials(member.name)}
                                src={member.image}
                                sx={{ mr: 2, width: 50, height: 50 }}
                                />
                                <Typography color='textPrimary' variant='body1'>
                                    {member.id}
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell align='center'>
                            <AccusationStatus status={member.accusedYN} member={member} data={data} registerBtnClick={registerBtnClick}/>
                        </TableCell>
                    </TableRow>
                    );
                }) :
                <TableRow>
                    <TableCell align='center' colSpan={6}>
                        <Box sx={{py: 3, minHeight: 560}}>
                            <CircularProgress />
                        </Box>
                    </TableCell>
                </TableRow>}
            </TableBody>
        </Table>
    </TableContainer>
    </>);
};

export default MemberInfoTable;

const AccusationStatus = ({ status, member, data, registerBtnClick }) => {
    if (status) {
        return (
            <Button
            variant='outlined'
            size='small'
            disabled
            >
                <WbTwilightOutlinedIcon />
                신고하기
            </Button>
        );
    }

    return (
        <Button
        variant='outlined'
        color='error'
        size='small'
        onClick={(e) => registerBtnClick(e, member, data)}
        >
            <WbTwilightOutlinedIcon />
            신고하기
        </Button>
    );
};
