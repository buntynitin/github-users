import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import Header from './Header'
import {Card, Grid, Typography, Container} from '@material-ui/core'
import ReactPlaceholder from 'react-placeholder'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import BusinessIcon from '@material-ui/icons/Business';
import axios from 'axios'
import "react-placeholder/lib/reactPlaceholder.css";
import GitHubIcon from '@material-ui/icons/GitHub';
import ErrorIcon from '@material-ui/icons/Error';
import Repositories from './Repositories'
function Detail() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const [error, setError] = useState({
        hasError : false,
        errorMessage : ''
    })

    useEffect(() => {
        setIsLoading(true)
        setError({
            hasError : false,
            errorMessage:''}
            )

        axios.get(`https://api.github.com/users/${new URLSearchParams(location.search).get('user_name')}`)
            .then((res) => {
              
                setIsLoading(false)
                setUser(res.data)
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
                    errorMessage:"Github API limit exceeded, Try Again after some time"}
                    )
                 else setError({
                    hasError : true,
                    errorMessage:"No Such user"}
                    )
              }

              setIsLoading(false)
               
            })

    }, [location])

    

    return (
        <div>
            <Header />
            <Container style={{marginTop:"18px"}}>
            

            {
                isLoading &&
                <Card style={{ borderRadius: "18px" }}>
                    <div style={{ padding: "18px" }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={3}>
                                <center><ReactPlaceholder showLoadingAnimation={true} style={{ borderRadius: "18px", width: "200px", height: "200px" }} color='#E0E0E0' type="rect" ready={false} /></center>
                            </Grid>
                            <Grid item xs={12} sm={9}>

                                <center style={{ marginTop: "18px" }}>
                                    <div style={{ width: "300px" }}>
                                        <ReactPlaceholder type='text' ready={false} rows={5} color='#E0E0E0' showLoadingAnimation={true} />
                                    </div>
                                </center>

                            </Grid>
                        </Grid>
                    </div>
                </Card>

            }
            {
                (error.hasError) ?
                    <Card style={{ borderRadius: "18px" }}>
                        <div style={{ display: 'flex', height: "236px", justifyContent: "center", alignItems: "center" }}>

                            <GitHubIcon style={{ fontSize: "100px", color: "#495057" }} />
                            <ErrorIcon style={{ position: "absolute", color: "#ef233c", transform: "translate(40px, 45px)", fontSize: "42px" }} />
                            <Typography style={{ position: "absolute", transform: "translateY(80px)", color: "#495057" }} variant="h6">
                                {error.errorMessage}
                            </Typography>




                        </div>
                    </Card>
                    :

                    user.login &&
                    <div>
                    <Card style={{ borderRadius: "18px" }}>
                        
                            <div style={{ padding: "18px" }}>

                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={3}>

                                        <center><img draggable={false} style={{ borderRadius: "18px" }} width="200px" height="200px" src={user.avatar_url} alt='' /></center>

                                    </Grid>

                                    <Grid item xs={12} sm={9}>
                                        <center style={{ marginTop: "18px" }}>
                                            <Typography variant="h5">
                                                {user.login}&nbsp; {user.name && <Typography variant="caption">{`(${user.name})`}</Typography>}
                                            </Typography>

                                            <Typography variant="body1" style={{ color: "#6c757d" }}>
                                                <em>{user.bio}</em>
                                            </Typography>
                                            <div style={{ color: "#343a40" }}>
                                                <Typography>
                                                    followers : {user.followers} • following : {user.following}
                                                </Typography>
                                            </div>
                                            {
                                                user.company &&
                                                <div style={{ color: "#343a40" }}>
                                                    <Typography variant="body2">
                                                        <BusinessIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} />&nbsp;{user.company}
                                                    </Typography>
                                                </div>
                                            }
                                            {user.email &&
                                                <div style={{ color: "#343a40" }}>
                                                    <Typography>
                                                        <MailOutlineIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} />&nbsp;{user.email}
                                                    </Typography>
                                                </div>
                                            }
                                            {user.location &&
                                                <div style={{ color: "#343a40" }}>
                                                    <Typography variant="body2">
                                                        <LocationOnIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} /> {user.location}
                                                    </Typography>
                                                </div>
                                            }
                                            <div style={{ color: "#343a40" }}>
                                                <Typography variant="body2">
                                                    Repositories : {user.public_repos}
                                                </Typography>
                                            </div>
                                            <div style={{ color: "#343a40" }}>
                                                <Typography variant="body2">
                                                    Joined On : {new Date(user.created_at).toDateString()}
                                                </Typography>
                                            </div>
                                        </center>

                                    </Grid>
                                </Grid>


                            </div>
                      
                    </Card>
                    <Repositories url={user.repos_url}/>
                    </div>

            }

            
            </Container>
        </div>
    )
}
export default Detail