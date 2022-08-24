import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Paper,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
//import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import BasicDateTimePicker from '../Utils/BasicDateTimePicker';
// ============================|| FIREBASE - REGISTER ||============================ //

import MapModal from '../Utils/MapPopup';
import MapModalDestination from '../Utils/MapPopupDest';
import { Link } from 'react-router-dom';

const Subtitle = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    textAlign: 'center',
    display:'flex',
    justifyContent:'center',
    fontSize:'105%',
    color:'#fff',
    height:"50px"
  }));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize : '80%'
  }));

const MoveInfoRegister = () => {

    // const [level, setLevel] = useState();
    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    // const changePassword = (value) => {
    //     const temp = strengthIndicator(value);
    //     setLevel(strengthColor(temp));
    // };

    // useEffect(() => {
    //     changePassword('');
    // }, []);

    return (
        <>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    company: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                //     try {
                //         setStatus({ success: false });
                //         setSubmitting(false);
                //     } catch (err) {
                //         console.error(err);
                //         setStatus({ success: false });
                //         setErrors({ submit: err.message });
                //         setSubmitting(false);
                //     }
                // }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container  spacing={3}>
                            <Grid item xs={3} sm={3} md={3} sx={{p:1}}>
                                <Subtitle><div name="placeOfDeparture" style={{marginTop:'10px'}}>출발지</div></Subtitle>
                            </Grid>
                            <Grid item xs={9} sm={9} md={9} sx={{p:1}}>
                                <Item><MapModal textName="출발지역 선택" type="a" mapid="TMapDepart"/></Item>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} sx={{p:1}}>
                                <Subtitle ><div name="destination" style={{marginTop:'10px'}}>도착지</div></Subtitle>
                            </Grid>
                            <Grid item xs={9} sm={9} md={9} sx={{p:1}}>
                                <Item><MapModalDestination textName="도착지역 선택" type="b" mapid="TMapDest"/></Item>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{p:1}}>
                                <Stack spacing={1} sx={{p:1}}>
                                    <Subtitle ><div name="startDate" style={{marginTop:'10px'}}>출발시간</div></Subtitle>
                                    <BasicDateTimePicker/>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{p:1}}>
                                <Stack spacing={1} sx={{p:1}}>
                                    <Subtitle ><div name="distance" style={{marginTop:'10px'}}>이동거리</div></Subtitle>
                                    <OutlinedInput id="distance" value=""/>
                                </Stack>
                                <Stack spacing={1} sx={{p:1}}>
                                    <Subtitle ><div name="maxNumberOfParty" style={{marginTop:'10px'}}>파티인원</div></Subtitle>
                                    <OutlinedInput id="maxNumberOfParty" value=""/>
                                </Stack>
                            </Grid>
                            {/* Button start*/}
                             <Grid item xs={12} align="center">
                                {/* 나중에 summit으로 변경하고 summit handle해서 넘어가도록 조정 */}
                                <Link to="/my-carpool-list" style={{ textDecoration: 'none' }}>
                                    <Button
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{m:2}}
                                    >
                                        등록
                                    </Button>
                                </Link>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        size="large"
                                        variant="contained"
                                        color="error"
                                        sx={{m:2}}
                                        onClick={()=>alert('취소!')}
                                    >
                                    취소
                                    </Button>
                            </Grid>
                            {/* Button end*/}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default MoveInfoRegister;
