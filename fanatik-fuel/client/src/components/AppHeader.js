import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import LoginButton from './LoginButton';

const styles = {
  flex: {
    flex: 1,
  },
};

const AppHeader = ({ setUserLocation, classes }) => (
   <AppBar position="absolute">
     <Toolbar>
       <Typography variant="h6" color="inherit">
         Fanatik Fuel
       </Typography>
       <Button color="inherit" onClick={setUserLocation} >My Location</Button>
       // <Button color="inherit" component={Link} to="/">Home</Button>
       <div className={classes.flex} />
      <LoginButton />
     </Toolbar>
   </AppBar>
 );

export default withStyles(styles)(AppHeader);
