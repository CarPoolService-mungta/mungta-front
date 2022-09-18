import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-1.png';
import avatar3 from 'assets/images/users/avatar-1.png';
import avatar4 from 'assets/images/users/avatar-1.png';


import { Link } from 'react-router-dom';
import { Box } from '../../../node_modules/@material-ui/core/index';
import MainCard from '../../components/MainCard';

import Grid from '@mui/material/Unstable_Grid2';

const driverCard = (
  <Card sx={{ maxWidth: 200 }}>
    <CardActionArea>
      <CardMedia component="img" height="200" src={avatar1} />
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="div">
          운전자
        </Typography>
        <Typography variant="body2" color="text.secondary">
          부서
        </Typography>
        <Typography variant="body2" color="text.secondary">
          이름
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default function ActionAreaCard() {
  return (
    <MainCard darkTitle={true} title={'리뷰대상 선택하기'}>
      <Grid container display="flex">
        <Grid xs>
          <Card sx={{ maxWidth: 200 }}>
            <CardActionArea component={Link} to="/review-register">
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
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs>
          <Card sx={{ maxWidth: 200 }}>
            <CardActionArea component={Link} to="/review-register">
              <CardMedia component="img" height="200" src={avatar2} />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  카풀러1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  부서
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이름
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs>
          <Card sx={{ maxWidth: 200 }}>
            <CardActionArea component={Link} to="/review-register">
              <CardMedia component="img" height="200" src={avatar3} />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  카풀러2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  부서
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이름
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid xs>
          <Card sx={{ maxWidth: 200 }}>
            <CardActionArea component={Link} to="/review-register">
              <CardMedia component="img" height="200" src={avatar4} />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  카풀러3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  부서
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이름
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
}
