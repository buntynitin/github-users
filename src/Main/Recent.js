import React from 'react'
import { useStateValue } from './StateProvider'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ClearIcon from '@material-ui/icons/Clear';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Recent({ query }) {
    const history = useHistory()
    const [state,dispatch] = useStateValue();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [activeitem,setActiveitem] = React.useState({})
    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    return (
        <div>
            {
             (state.length > 0)?<div style={{marginTop:"18px"}}>
                    <Typography variant="h6" style={{color:"rgb(63,81,181",marginLeft:"18px",marginBottom:"8px"}}>
                        Search History
                    </Typography>
                     <Grid container spacing={2}>
                     {
                     state.map((item)=><Grid item xs={12} sm={6} md={4} key={item.id}>
               
                         <Card style={{borderRadius:"18px"}} className="hoverCard">
                     
                         <Grid container spacing={0} >
                             <Grid item xs={3}>
                             <ButtonBase onClick={()=> history.push(`detail?user_name=${item.login}`)}>
                                <div>
                                <img alt="" draggable={false} style={{ width: "100%",height:"120px",transform:"scale(1.08)",borderBottomRightRadius:"18px",borderTopRightRadius:"22px", objectFit:"cover" }} src={item.avatar_url}/>
                                 </div>
                              </ButtonBase>
                                
                             </Grid>
                             <Grid item xs={7}>
                                 <ButtonBase onClick={()=> history.push(`detail?user_name=${item.login}`)}>
                                 <div style={{padding:"18px"}}>
                                 <Typography variant="h6">
                                     {item.login}
                                 </Typography>
                                 <Typography style={{color:"#343a40"}}>
                                    Repositories : {item.public_repos}
                                    </Typography>
                                    <Typography variant='caption' style={{color:"#495057"}}>
                                    followers : {item.followers} • following : {item.following}
                                    </Typography>
                                    
                                    </div>
                                    </ButtonBase>
                             </Grid>
                             <Grid item xs={2}>
                                <ButtonBase style={{borderRadius:"18px",width:"100%", height:"42px", color:"#6c757d"}} 
                                onClick={()=>{
                                    setActiveitem(item)
                                    handleClickOpen()}
                                }
                                ><CloseIcon/></ButtonBase>
                               
                            
                                
                             </Grid>

                         </Grid>
                     
                         </Card>
                     
                         </Grid>)
                      }
                     </Grid>
                   
            </div>:
            <div>  
                {query === ''?
                 <div style={{marginTop:"30vh"}}>
                 <center>
                 <img width="100px" height="100px" src="/github.svg"/>
                     <Typography variant="h5">
                         
                         
                         Welcome to Github Users
 
                     </Typography>
                     </center>
             </div>:
             <div />
                
            } 
               
            </div>
            }
            <Snackbar

anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
}}
open={open1}
autoHideDuration={2000}
onClose={handleClose1}

>
<SnackbarContent
    style={{ background: "rgba(231,29,54,0.8)", borderRadius: "18px"}}
    message={
        <span style={{
            display: "flex",
            alignItems: "center"
        }}>
            <ClearIcon style={{ marginRight: "12px" }} />
            {"User Removed from history"}
        </span>
    }
/>

</Snackbar>

<Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                >
                                <DialogTitle>{"Are you sure ?"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    The user will be permanently deleted from search history. This action cannot be undone.
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button 
                                onClick={()=>{
                                    dispatch({
                                    type:"REMOVE",
                                    item: activeitem
                                })
                                handleClick1()
                                handleClose()
                               
                            }

                            }
                                color="primary" autoFocus>
                                    Delete
                                </Button>
                                </DialogActions>
                            </Dialog>

        </div>
    )
}