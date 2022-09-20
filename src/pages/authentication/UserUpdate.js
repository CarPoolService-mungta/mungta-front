import { useEffect, useState, useRef } from 'react';
import MainCard from 'components/MainCard';
import { Box,Button,Divider,FormControl,FormHelperText,Grid,Link,IconButton,InputAdornment,
    InputLabel,OutlinedInput, Stack,Typography,Avatar,Container,
} from '@mui/material';
import * as Yup from 'yup';
import {Formik } from 'formik';
import {getUserByUserId, updateByUserId} from 'api/user'
import {useNavigate} from 'react-router-dom';
import {useSelector } from 'react-redux';
import {useSnackbar } from 'notistack';
import CustomError from 'utils/CustomError';
import AnimateButton from 'components/@extended/AnimateButton';
import {strengthColor, strengthIndicator } from 'utils/password-strength';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {LoadingButton} from '@material-ui/lab';

const avartarStyle = {
    height: "10vh",
    width : "7vw",
    marginLeft: 0,
    marginTop: 20,
    marginBottom: 20,
}
// ============================|| FIREBASE - REGISTER ||============================ //
const UserUpdate = () => {

    let fileBf = '';
    let dataUrlmagetmp ='';

    const userInfo   = useSelector(state =>  state.userInfo );

    const navigate = useNavigate();
    const {enqueueSnackbar } = useSnackbar();
    const [isCheckLoading, setCheckLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);


    const [image   , setImage]    = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [imageUrl, setImageUrl] = useState(null);
    const imgRef   = useRef();

    const [userEmail, setUserEmail] = useState(null);



    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    //useEffect(() => {changePassword('');}, []);
    useEffect(async ()=>{await inqUser()},[]);


    const inqUser = async ()=>{
        await setIsLoading(true);
        const response = await getUserByUserId(userInfo.userId)
            if(response instanceof CustomError){
                enqueueSnackbar(response.message, {variant: 'error'});
            }else{
                console.log("userInfo:",response.userMailAddress );
                //console.log("userInfo:",response.possibleYn );

                const str1='data:image/';
                const str2=response.fileExtension;;
                const str3=';base64,';
                const str4=response.userPhoto;
                dataUrlmagetmp =str1+str2+str3+str4;
                setUserEmail(userEmail=>response.userMailAddress)
            }
            //await setdataUrlmage(dataUrlmage => dataUrlmagetmp);
        await setIsLoading(false);
    }









    const handleImage = async(e)=>{

        const filereal = e.target.files[0];
        const err = checkImage(filereal);
        console.log("filereal:",filereal );
        if(filereal){
            setImage(e.target.files[0]);

        }else{
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
            return;
        }
        setImageUrl(filereal);

        const reader = new FileReader();
        reader.onload = () => {
        if(reader.readyState === 2){
        setImage(reader.result);
        }
        }
        reader.readAsDataURL(filereal);
    }

    const checkImage = (file) =>{
        let err="";
        if(!file) return err="File does not exist.";

        if(file.size>1024*1024){
            err = "The largest image size is 1mb.";
        }
        if(file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png'){
            err = "Image format is incorrect.";
        }
        return err;
    }

    const updateConfirm  = async ()=>{

        let formData = new FormData();
        formData.append("profileImg"     , imageUrl);
        formData.append("userId"         , userid.value);
        formData.append("userPassword"   , password.value);
        formData.append("userMailAddress", email.value );
        formData.append("userName"       , username.value);
        formData.append("userTeamName"   , company.value);
        formData.append("userGender"     , gender.value);
        formData.append("driverYn"       , driveryn.value);
        formData.append("settlementUrl"  , smturl.value );
        formData.append("carType"        , cartype.value);
        formData.append("carNumber"      , carnumber.value);

        await updateByUserId(userInfo.userId, formData)
        .then((response) => {
            console.log("response:",response );

            if(response instanceof CustomError){
                enqueueSnackbar(response.message, {variant: 'error'});
            }else{
                enqueueSnackbar('수정이 완료되었습니다.', {variant: 'success'});
                navigate('/mypage');
            }
        });

        await setIsLoading(false);
    }


return (
        <>
         <MainCard darkTitle={true}  title="회원정보관리" >
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    userid:'',
                    company: '',
                    password: '',
                    gender:'',
                    driveryn:'',
                    carnumber:'',
                    cartype:'',
                    smturl:'',
                    // profileImg:'',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    // userid: Yup.string().max(255).required('ID is required'),
                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    // password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        updateConfirm();
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>

                        <Grid container spacing={1} item xs={6}>
                        <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">이메일</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="email"
                                        type="email"
                                        readOnly="true"
                                        disabled="true"
                                        value= {userEmail}
                                        name="email"
                                        inputProps={{}}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="id-signup">아이디</InputLabel>
                                    <OutlinedInput
                                        id="userid"
                                        type="text"
                                        disabled="true"
                                        readOnly="true"
                                        value={values.userid}
                                        name="userid"
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username-signup">이름</InputLabel>
                                    <OutlinedInput
                                        id="username"
                                        type="name"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id="helper-text-username-signup">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gender-signup">성별</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.gender && errors.gender)}
                                        id="gender"
                                        value={values.gender}
                                        name="gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="M or F"
                                        inputProps={{}}
                                    />
                                    {touched.gender && errors.gender && (
                                        <FormHelperText error id="helper-text-gender-signup">
                                            {errors.gender}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">소속부서</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.company && errors.company)}
                                        id="company"
                                        value={values.company}
                                        name="company"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.company && errors.company && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                        <Container align="left" xs={6} sx={{ margin: 0 }} >
                            <Avatar src= {image} style = {avartarStyle} onClick={()=>{imgRef.current.click()}}></Avatar>
                                <input  type='file' style={{display:'none'}} accept='image/jpg,impge/png,image/jpeg' name='profileImg' onChange={handleImage} ref={imgRef}/>
                        </Container>
                        <Grid container spacing={1} item xs={6}>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="driveryn-signup">운전여부</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.company && errors.company)}
                                        id="driveryn"
                                        value={values.driveryn}
                                        name="driveryn"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Y or N"
                                        inputProps={{}}
                                    />
                                    {touched.driveryn && errors.driveryn && (
                                        <FormHelperText error id="helper-text-driveryn-signup">
                                            {errors.driveryn}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="smturl-signup">카카오톡 송금주소</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.smturl && errors.smturl)}
                                        id="smturl"
                                        value={values.smturl}
                                        name="smturl"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="카카오페이접속->내프로필->송금코드클릭"
                                        inputProps={{}}
                                    />
                                    {touched.smturl && errors.smturl && (
                                        <FormHelperText error id="helper-text-smturl-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="carnumber-signup">자동차번호</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.carnumber && errors.carnumber)}
                                        id="carnumber"
                                        value={values.carnumber}
                                        name="carnumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Car number"
                                        inputProps={{}}
                                    />
                                    {touched.carnumber && errors.carnumber && (
                                        <FormHelperText error id="helper-text-carnumber-signup">
                                            {errors.carnumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="cartype-signup">자동차 종류</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.cartype && errors.cartype)}
                                        id="cartype"
                                        value={values.cartype}
                                        name="cartype"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Car Type"
                                        inputProps={{}}
                                    />
                                    {touched.cartype && errors.cartype && (
                                        <FormHelperText error id="helper-text-cartype-signup">
                                            {errors.cartype}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        신청
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            </MainCard>
        </>
    );
};

export default UserUpdate;