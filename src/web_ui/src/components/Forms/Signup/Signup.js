import { Link, Router } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  // Add form styling
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  formControl: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Signup() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
          Signup.
        </Typography>
        <form className={classes.form} noValidate>
          <div className="data-form-inputs">
            <label htmlFor="Name" className="d-block padding-s">
              Name
              <input variant="outlined" required fullwidth="true" id="user-name" name="userName" type="text" />
            </label>
          </div>
          &nbsp;
          <div className="data-form-inputs">
            <label htmlFor="Email" className="d-block padding-s">
              Email
              <input variant="outlined" required fullwidth="true" id="user-email" name="userEmail" type="text" />
            </label>
          </div>
          &nbsp;
          <div className="data-form-inputs">
            <label htmlFor="Password" className="d-block padding-s">
              Password
              <input variant="outlined" required fullwidth="true" id="password" name="password" type="text" />
            </label>
          </div>
          &nbsp;
          <div className="d-flex">
            <div className="data-form-inputs">
              <label htmlFor="Confirm Password" className="d-block padding-s">
                Confirm Passord
                <input
                  variant="outlined"
                  required
                  fullwidth="true"
                  id="confirm-password"
                  name="confirmPassord"
                  type="text"
                />
              </label>
            </div>
            &nbsp;
          </div>
          <Button mediumWidth size="large" type="submit" color="primary" variant="contained" className={classes.submit}>
            {/* <Router > */}
            <Link to="/login">
              <h2>Signup</h2>
            </Link>
            {/* </Router> */}
          </Button>
        </form>
      </div>
    </Container>
  );
}
