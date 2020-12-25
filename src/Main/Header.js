import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
      textDecoration : 'none',
      color: '#ffffff'
  }
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <GitHubIcon />
          <Typography variant="h6" className={classes.title}>
           <Link className={classes.link} to="/">&nbsp;&nbsp;Github Users</Link>
          </Typography>  
        </Toolbar>
      </AppBar>
    </div>
  );
}