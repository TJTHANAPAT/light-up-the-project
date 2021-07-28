import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  homepageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
  },
  btnBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '250px',
    margin: '0.5rem',
  },
}));

const Homepage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.homepageContainer}>
      <Typography variant="h2" component="h1" color="textPrimary" gutterBottom>
        จุดประกายฝัน 2021
      </Typography>
      <Box className={classes.btnBox}>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          href="#"
          disableElevation
        >
          ลงทะเบียน
        </Button>
        <span> </span>
        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          href="#"
        >
          ดูข้อมูล
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <Button variant="text" href="/admin">
        Admin
      </Button>
    </Container>
  );
};

export default Homepage;
