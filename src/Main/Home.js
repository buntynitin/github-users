import React, { useState } from 'react'
import Header from './Header'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ClearIcon from '@material-ui/icons/Clear'
import ReactPlaceholder from 'react-placeholder'
import GitHubIcon from '@material-ui/icons/GitHub';
import axios from 'axios'
import ErrorIcon from '@material-ui/icons/Error';
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import BusinessIcon from '@material-ui/icons/Business';
import Typography from '@material-ui/core/Typography'
import Recent from './Recent'
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom'
import "react-placeholder/lib/reactPlaceholder.css";
import CardActionArea from '@material-ui/core/CardActionArea'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CheckIcon from '@material-ui/icons/Check';
export default function Home() {
    const [query, setQuery] = useState({
        name: '',
        typing: false,
        typingTimeout: 0
    })
    const [error, setError] = useState({
        hasError : false,
        errorMessage : ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [state,dispatch] = useStateValue();
    const [user, setUser] = useState({})
    const [open, setOpen] = React.useState(false);
    const history = useHistory()

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSearch = async (qry) => {
        if (qry.trim() !== '')
        {
            setIsLoading(true)
            setError({
                hasError : false,
                errorMessage:''}
                )

            await axios.get(`https://api.github.com/users/${qry.replace(' ','')}`)
                .then((res) => {
             
                    setIsLoading(false)
                    setUser(res.data)
                    
                    dispatch({
                        type:"ADD",
                        item: res.data
                    })
                    handleClick()
                })
                .catch((err) => {
                   
                    if (err.message === "Network Error")
                        setError({
                            hasError : true,
                            errorMessage:"Network Error"}
                            )
                  else{
                      if(err.response.status === 403)
                      setError({
                        hasError : true,
                        errorMessage:"Github API limit exceeded"}
                        )
                     else setError({
                        hasError : true,
                        errorMessage:"No Such user"}
                        )
                  }

                  setIsLoading(false)
                   
                })

            }else{
                setIsLoading(false)
            }

    }

    const handleChange = (e) => {
        setUser({})
        setError({
            hasError : false,
            errorMessage:""}
            )
        setIsLoading(true)
        
        if (query.typingTimeout) {
            clearTimeout(query.typingTimeout);
        }

        setQuery({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                handleSearch(e.target.value)
            }, 1000)
        });


    }

    return (
        <div>
            <Header />
            <Container style={{ marginTop: "18px" }}>
                <Card style={{borderRadius:"18px"}} raised>
                    <Grid container spacing={0}>
                        <Grid item xs={2} sm={1}>
                            <div style={{ width: "100%", background: "rgb(63,81,181)", height: "100%", display: "flex", alignItems: "center" }}>
                                <SearchIcon style={{ marginLeft: "50%", transform: "translatex(-50%)", color: "#ffffff" }} />
                            </div>
                        </Grid>
                        <Grid item xs={10} sm={11} style={{ padding: "8px"}}>
                            <div style={{display:"flex",flexDirection:"row",transform:"translateY(2px)"}}>
                            <div style={{paddingRight:"18px",width:"100%"}}>
                            <InputBase
                                fullWidth
                                size="medium"
                                value={query.name}
                                placeholder={"Enter Github username"}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div style={{alignItems:"center",transform:"translateY(3px)"}}>
                            {
                                                query.name && <ClearIcon onClick={() => {setQuery({
                                                    name: '',
                                                    typing: false,
                                                    typingTimeout: 0
                                                })
                                                setUser({})}
                                               } style={{ color: "rgb(63,81,181" }} />
                             }
                             </div>
                             </div>
                        </Grid>
                    </Grid>
                </Card>

       {
        query.name &&
        <div style={{marginTop:"18px"}}>
        <Typography variant="h6" style={{marginLeft:"18px",marginBottom:"8px",color:"rgb(63,81,181"}}>
            Search Result
        </Typography>
        
       
        {

            isLoading &&
            <Card style={{borderRadius:"18px"}}>
                <div style={{padding:"18px"}}>
                 <Grid container spacing={0}>
                    <Grid item xs={12} sm={3}>
                    <center><ReactPlaceholder showLoadingAnimation={true} style={{borderRadius:"18px",width:"200px",height:"200px"}} color='#E0E0E0' type="rect" ready={false} /></center>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                    
                    <center style={{marginTop:"18px"}}>
                    <div style={{width:"300px"}}>
                        <ReactPlaceholder type='text' ready={false} rows={5} color='#E0E0E0' showLoadingAnimation={true} />
                        </div>
                        </center>
                    
                    </Grid>
               </Grid>
               </div>
               </Card>
            
        }
        {
            (error.hasError)?
            <Card style={{borderRadius:"18px"}}>
            <div style={{display:'flex',height:"236px",justifyContent:"center",alignItems:"center"}}>
              
                    <GitHubIcon style={{fontSize:"100px",color:"#495057"}} />
                    <ErrorIcon style={{position:"absolute",color:"#ef233c", transform:"translate(40px, 45px)",fontSize:"42px"}}/>
                    <Typography style={{position:"absolute",transform:"translateY(80px)", color:"#495057"}} variant="h6">
                        {error.errorMessage}
                    </Typography> 
                 
                              
       
      
            </div>
            </Card>
            :
            
                user.login &&
                <Card style={{borderRadius:"18px"}}>
                <CardActionArea onClick={()=> history.push(`detail?user_name=${user.login}`)} >
                <div style={{padding:"18px"}}>
                    
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={3}>
                
                    <center><img draggable={false} style={{borderRadius:"18px"}} width="200px" height="200px" src={user.avatar_url} alt=''/></center>
                
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <center style={{marginTop:"18px"}}>
                        <Typography variant="h5">
                            {user.login}&nbsp; {user.name && <Typography variant="caption">{`(${user.name})`}</Typography>}
                        </Typography>
                        
                        <Typography variant="body1" style={{color:"#6c757d"}}>
                            <em>{user.bio}</em>
                        </Typography>
                        <div style={{color:"#343a40"}}>
                        <Typography>
                            followers : {user.followers} • following : {user.following}
                        </Typography>
                        </div>
                        {
                          user.company &&
                          <div style={{color:"#343a40"}}>
                            <Typography variant="body2">
                            <BusinessIcon style={{transform:"translateY(2px)", fontSize:"16px"}} />&nbsp;{user.company}
                        </Typography>
                        </div>
                        }
                        {user.email&&
                         <div style={{color:"#343a40"}}>
                        <Typography>
                            <MailOutlineIcon style={{transform:"translateY(2px)", fontSize:"16px"}} />&nbsp;{user.email}
                        </Typography>
                        </div>
                        }
                       { user.location &&
                       <div style={{color:"#343a40"}}>
                        <Typography variant="body2">
                           <LocationOnIcon  style={{transform:"translateY(2px)", fontSize:"16px"}} /> {user.location}
                        </Typography>
                        </div>
                        }    
                        <div style={{color:"#343a40"}}>   
                        <Typography variant="body2">
                            Repositories : {user.public_repos}
                        </Typography>
                        </div>
                        <div style={{color:"#343a40"}}>   
                        <Typography variant="body2">
                            Joined On : {new Date(user.created_at).toDateString()}    
                        </Typography>
                        </div>
                        </center>
                       
                    </Grid>
                </Grid>
           
                
            </div>
            </CardActionArea>
        </Card>
           

        }

        

        </div>
       }
       <Recent query={query.name} />
       <Snackbar

anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
}}
open={open}
autoHideDuration={2000}
onClose={handleClose}

>
<SnackbarContent
    style={{ background: "rgba(22,219,147,0.9)", borderRadius: "18px" }}
    message={
        <span style={{
            display: "flex",
            alignItems: "center"
        }}>
            <CheckIcon style={{ marginRight: "12px" }} />
            {"User added to history"}
        </span>
    }
/>

</Snackbar>
            </Container>
           
        </div>
    
    )
}
