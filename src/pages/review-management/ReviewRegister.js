import MainCard from '../../components/MainCard';
import { Form, useFormik } from 'formik';

import * as Yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';

import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import { Link } from 'react-router-dom';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-1.png';
import avatar3 from 'assets/images/users/avatar-1.png';
import Typography from '@mui/material/Typography';

const labels = {
  1: 'VERYBAD',
  2: 'BAD',
  3: 'OK',
  4: 'GOOD',
  5: 'VERYGOOD',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const formik = useFormik({
    initialValues: {
      title: '',
      body: 'ABVCDEF',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('제목을 입력해주세요.'),
      body: Yup.string().required('문의사항을 입력해주세요.'),
    }),
    onSubmit: (values) => {
      console.log('values : ', values);
    },
  });

  return (

    <MainCard darkTitle={true} title={'리뷰 작성하기'}>
      <Grid container display="flex" style={{ marginBottom:10}}>
        <Card sx={{ maxWidth: 200 }}>
            <CardMedia component="img" height="200" src={avatar1} />
            <CardContent>
              <Typography
                align="center"
                gutterBottom
                variant="h4"
                component="div"
              >
                운전자
              </Typography>
              <Typography variant="body2" color="text.secondary">
                부서
              </Typography>
              <Typography variant="body2" color="text.secondary">
                이름
              </Typography>
            </CardContent>
        </Card>
      </Grid>
      <Box
          sx={{

            width: 200,
            display: 'flex',
          }}
          container
          style={{ marginBottom:10}}
          
        >
          <Rating
            name="hover-feedback"
            defaultValue={3}
            size="large"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <Grid
          container
          justifyContent="flex-start"
          spacing={2}
          style={{ marginBottom: 5 }}
        >
          <Grid item xs={12}>
            <TextField
              name="body"
              label="내용"
              multiline
              rows={5}
              fullWidth
              display="flex"
            />
          </Grid>
        </Grid>

      <Grid container justifyContent="flex-end" direction="row" spacing={2}>
        <Grid item>
          <Button
            justifyContent="center"
            variant="contained"
            type="submit"
            onSubmit={() => handleSubmit()}
          >
            제출
          </Button>
        </Grid>
      </Grid>

    </MainCard>
  );
}
