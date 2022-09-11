import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,    Button,    Divider,    FormControl,    FormHelperText,    Grid,
    Paper,    IconButton,    InputAdornment,    InputLabel,    OutlinedInput,
    Stack,    Typography
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
// third party
import * as Yup from 'yup';
import { Field, Form, Formik, useFormik ,FormikProvider} from 'formik';
// project import
//import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import BasicDateTimePicker from '../Utils/BasicDateTimePicker';
// ============================|| FIREBASE - REGISTER ||============================ //
import { DesktopDateTimePicker } from '@mui/x-date-pickers-pro';
import MapModal from '../Utils/MapPopup';
import MapModalDestination from '../Utils/MapPopupDest';
import {Link, useNavigate} from 'react-router-dom';
import { DesktopTimePicker } from 'formik-mui-lab';
import DatepickerField from '../Utils/DatepickerField';
import {postMoveInfo} from 'api/partymanagement';
//import CustomError from 'utils/CustomError'
import { useSnackbar } from 'notistack';

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
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        placeOfDeparture: '출발',
        destination: '도착',
        startDate: '',
        distance:'',
        maxNumberOfParty:'',
      },
      validationSchema: Yup.object({
        placeOfDeparture: Yup.string()
          .max(255, '출발지를 입력하세요')
          .required('Required'),
        destination: Yup.string()
          .max(255, '목적지를 입력하세요')
          .required('Required'),
        startDate: Yup.string().required('Required'),
        maxNumberOfParty: Yup.string().required('Required'),
      }),
    //   onSubmit: (values) => {
    //     alert(JSON.stringify(values, null, 2));
    //   },
    onSubmit: async (values, { setSubmitting})=>{

        setSubmitting(true);
        // Todo 수정 필요
        const moveInfoRegisterRequest = {

            curNumberOfParty:1,
            driver:{
                userId:"1",
                carKind: "BMW",
                carNumber: "12가1234",
                department: values.placeOfDeparture,
                gender: "male",
                name: "test",
                profileImage: "profile_img_src",
                reviewInfo: {
                  recentComment: "good boy",
                  reviewAverageScore: 2.1
                },
                settlementUrl: "settlementUrl.html",
            },
            moveInfo:{
                placeOfDeparture: values.placeOfDeparture,
                destination: values.destination,
                startDate: values.startDate,
                distance: values.distance,
                price: 0
            },
            maxNumberOfParty:values.maxNumberOfParty,
            status: "OPEN"
        };
        console.log("작성한거",moveInfoRegisterRequest);
        const response =  postMoveInfo(moveInfoRegisterRequest);
        console.log('돌아온거',response);
        setSubmitting(false);

        //enqueueSnackbar('운전정보가 등록되었습니다.', {variant: 'success'});
        navigate(`/my-carpool-list`);
        // if(response instanceof CustomError){
        //     enqueueSnackbar(response.message, {variant: 'error'});
        // }else{
        //     enqueueSnackbar('운전정보가 등록되었습니다.', {variant: 'success'});
        //     navigate(`/my-carpool-list`);
        // }
    },
    });
    return (
    <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={formik.handleSubmit}>

            <Grid container  spacing={3}>
                <Grid item xs={3} sm={3} md={3} sx={{p:1}}>
                    <Subtitle><div style={{marginTop:'10px'}}>출발지</div></Subtitle>
                </Grid>
                <Grid item xs={9} sm={9} md={9} sx={{p:1}}>
                    <Item>
                        <MapModal textName="출발지역 선택" type="a" mapid="TMapDepart"/>
                        <input
                            id="placeOfDeparture"
                            name="placeOfDeparture"
                            type="hidden"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.placeOfDeparture}
                        />
                    </Item>
                    {formik.touched.placeOfDeparture && formik.errors.placeOfDeparture ? (
                    <div>{formik.errors.placeOfDeparture}</div>
                    ) : null}
                </Grid>
                <Grid item xs={3} sm={3} md={3} sx={{p:1}}>
                    <Subtitle >
                        <div style={{marginTop:'10px'}}>도착지</div>
                    </Subtitle>
                </Grid>
                <Grid item xs={9} sm={9} md={9} sx={{p:1}}>
                    <Item>
                        <MapModalDestination textName="도착지역 선택" type="b" mapid="TMapDest"/>
                        <input
                            id="destination"
                            name="destination"
                            type="hidden"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.destination}
                        />
                    </Item>
                    {formik.touched.destination && formik.errors.destination ? (
                    <div>{formik.errors.destination}</div>
                    ) : null}
                </Grid>
                <Grid item xs={12} md={6} sx={{p:1}}>
                    <Stack spacing={1} sx={{p:1}}>
                        <Subtitle ><div  style={{marginTop:'10px'}}>출발시간</div></Subtitle>
                        <Field
                            name="startDate"
                            component={DatepickerField}
                            inputVariant="outlined"
                            label="startDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startDate}
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                        <div>{formik.errors.startDate}</div>
                        ) : null}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} sx={{p:1}}>
                    <Stack spacing={1} sx={{p:1}}>
                        <Subtitle >
                            <div style={{marginTop:'10px'}}>이동거리</div>
                        </Subtitle>
                        <OutlinedInput
                                id="distance"
                                name="distance"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.distance}
                            />
                            {formik.touched.distance && formik.errors.distance ? (
                            <div>{formik.errors.distance}</div>
                            ) : null}
                    </Stack>
                    <Stack spacing={1} sx={{p:1}}>
                        <Subtitle ><div style={{marginTop:'10px'}}>파티인원</div></Subtitle>
                        <OutlinedInput
                                id="maxNumberOfParty"
                                name="maxNumberOfParty"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.maxNumberOfParty}
                            />
                            {formik.touched.maxNumberOfParty && formik.errors.maxNumberOfParty ? (
                            <div>{formik.errors.maxNumberOfParty}</div>
                            ) : null}
                    </Stack>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{m:2}}
                    >등록
                    </Button>
                    <Button
                        disableElevation
                        size="large"
                        variant="contained"
                        color="error"
                        sx={{m:2}}
                        onClick={()=>navigate('/party-management')}
                    >취소
                    </Button>
                </Grid>
            </Grid>
        </form>
        </LocalizationProvider>
      </FormikProvider>
    );

};

export default MoveInfoRegister;
