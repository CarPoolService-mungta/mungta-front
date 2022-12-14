import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdminAccusation, processAccusationByAdmin } from 'api/accusation';
import CustomError from 'utils/CustomError'
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@material-ui/lab';
import { SeverityPill } from 'utils/severity-pill';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Grid,
    InputLabel,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    Toolbar,
    Card,
    CardContent,
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';

const AdminAccusationDetail = () => {
    const navigate = useNavigate();
    const {accusationId} = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState({id: '', partyInfo: {placeOfDeparture: '', destination: '', startedDateTime: ''},
        accusedMember: {id: '', name: ''}, accusationContents: {title: '', desc: ''}, accusationStatus: '', resultComment: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await searchAccusation();
        }
        fetchData();
    },[]);

    const searchAccusation = async () => {
        setIsLoading(true);

        const response = await getAdminAccusation(accusationId, {});

        setData(!response.message ? response : []);
        setIsLoading(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rejectBtnClick = async () => {
        setOpen(false);
        setIsRejecting(true);

        const accusationStatus = 'REJECTED';
        const resultComment = data.resultComment;
        const response = await processAccusationByAdmin(accusationId, { accusationStatus, resultComment });

        setIsRejecting(false);
        if (response instanceof CustomError) {
            enqueueSnackbar(response.message, {variant: 'error'});
        } else {
            enqueueSnackbar('?????????????????????.', {variant: 'success'});
            location.reload();
        }
    };

    const customStyle = {
        padding: '10.5px 14px 10.5px 12px',
        font: 'inherit',
        borderRadius: '4px',
        borderColor: '#d9d9d9'
    };

    return (
        <>
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" style={{width: '500px'}}>
                {"??????"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"?????? ????????? ????????? ?????????."}
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="coment"
                    onChange={e => data.resultComment = e.target.value}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>??????</Button>
                <Button onClick={rejectBtnClick}>??????</Button>
            </DialogActions>
        </Dialog>
        </div>
        <Card sx={{ p: 2 }} style={{ borderRadius: '8px' }}>
            <Toolbar>
                <Typography
                sx={{ flex: '1 1 100%' }}
                variant='h4'
                id='tableTitle'
                component='div'>
                    {data.accusationContents?.title ? data.accusationContents.title : ''}
                </Typography>
                <AccusationStatus status={data.accusationStatus}/>
            </Toolbar>
            <CardContent>
            {!isLoading ?
                <Formik
                initialValues={{
                    placeOfDeparture: data.partyInfo?.placeOfDeparture ? data.partyInfo.placeOfDeparture : '',
                    destination: data.partyInfo?.destination ? data.partyInfo.destination : '',
                    startedDateTime: data.partyInfo?.startedDateTime ? data.partyInfo.startedDateTime : '',
                    memberFormat: data.accusedMember?.name && data.accusedMember?.id ?
                        data.accusedMember.name + '(' + data.accusedMember.id + ')' : '',
                    title: data.accusationContents?.title ? data.accusationContents.title : '',
                    desc: data.accusationContents?.desc ? data.accusationContents.desc : '',
                    submit: null
                }}
                enableReinitialize={true}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    try {
                        setSubmitting(true);

                        const accusationStatus = 'COMPLETED';
                        const resultComment = '';
                        const response = await processAccusationByAdmin(data.id, { accusationStatus, resultComment });

                        setSubmitting(false);
                        if (response instanceof CustomError) {
                            enqueueSnackbar(response.message, {variant: 'error'});
                        } else {
                            enqueueSnackbar('?????????????????????.', {variant: 'success'});
                            location.reload();
                        }
                    } catch (err) {
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                        enqueueSnackbar('????????? ??? ????????????.', {variant: 'error'});
                    }
                }}
                >
                {({ handleSubmit, isSubmitting, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor='firstname-signup'>?????????</InputLabel>
                                <TextField
                                id='outlined-read-only-input'
                                value={values.placeOfDeparture}
                                InputProps={{ readOnly: true }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor='firstname-signup'>?????????</InputLabel>
                                <TextField
                                id='outlined-read-only-input'
                                value={values.destination}
                                InputProps={{ readOnly: true }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor='firstname-signup'>?????? ??????</InputLabel>
                                <TextField
                                id='outlined-read-only-input'
                                value={values.startedDateTime}
                                InputProps={{ readOnly: true }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor='firstname-signup'>?????? ??????</InputLabel>
                                <TextField
                                id='outlined-read-only-input'
                                value={values.memberFormat}
                                InputProps={{ readOnly: true }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor='desc-signup'> ?????? ??????</InputLabel>
                                <TextareaAutosize
                                maxRows={5}
                                minRows={5}
                                aria-label='maximum height'
                                placeholder='??????'
                                value={values.desc}
                                style={customStyle}
                                />
                            </Stack>
                        </Grid>
                        <ButtonsByStatus status={data.accusationStatus} coment={data.resultComment} isSubmitting={isSubmitting}
                            isRejecting={isRejecting} handleClickOpen={handleClickOpen}/>
                    </Grid>
                </form>
                )}
                </Formik>
            :
            <Box sx={{py: 3, minHeight: 560}} style={{textAlign: 'center'}}>
                <CircularProgress />
            </Box>
            }
            </CardContent>
        </Card>
        </>
    );
}

export default AdminAccusationDetail;

const AccusationStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 'REGISTERED':
            color = 'warning';
            title = '?????? ??????';
            break;
        case 'REJECTED':
            color = 'error';
            title = '?????????';
            break;
        case 'COMPLETED':
            color = 'success';
            title = '?????? ??????';
            break;
        default:
            color = 'primary';
            title = '';
    }

    return (
        <SeverityPill style={{ width: '100px' }} color={color}>
            {title}
        </SeverityPill>
    );
};

AccusationStatus.propTypes = {
    status: PropTypes.string.isRequired
};

const ButtonsByStatus = ({ status, coment, isSubmitting, isRejecting, handleClickOpen }) => {

    if (status == 'REGISTERED') {
        return (
            <>
            <Grid item xs={11} textAlign='right'>
                <LoadingButton
                disableElevation
                loading={isSubmitting}
                size='medium'
                type='submit'
                variant='contained'
                color='primary'
                >
                    ??????
                </LoadingButton>
            </Grid>
            <Grid item xs={1} textAlign='center'>
                <LoadingButton
                loading={isRejecting}
                size='medium'
                variant='contained'
                color='primary'
                onClick={handleClickOpen}
                >
                    ??????
                </LoadingButton>
            </Grid>
            </>
        );
    } else if (status == 'REJECTED') {
        return (
            <>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <InputLabel htmlFor='firstname-signup'>?????? ??????</InputLabel>
                    <TextField
                    id='outlined-read-only-input'
                    value={coment}
                    InputProps={{ readOnly: true }}
                    />
                </Stack>
            </Grid>
            </>
        );
    } else {
        return (
            <></>
        );
    }
};

ButtonsByStatus.propTypes = {
    status: PropTypes.string.isRequired,
    coment: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isRejecting: PropTypes.bool.isRequired,
    handleClickOpen: PropTypes.func.isRequired
};
