import React, { useState, useEffect } from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import ReactPlaceholder from 'react-placeholder'
import axios from 'axios'
import "react-placeholder/lib/reactPlaceholder.css";
import GitHubIcon from '@material-ui/icons/GitHub';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import Divider from '@material-ui/core/Divider';
import InfiniteScroll from "react-infinite-scroll-component";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';  
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Graph from './Graph'



function Repositories({ url }) {
    const [isLoading, setIsLoading] = useState(true)
    const [repoList, setRepoList] = useState([])
    const [page, setPage] = useState(1)
    const [error, setError] = useState({
        hasError: false,
        errorMessage: ''
    })


    const fetchMoreData = () => {
        
        axios.get(`${url}?per_page=5&page=${page + 1}`)
            .then((res) => {
          
                setRepoList([...repoList, ...res.data])
            })
            .catch((err) => { })

        setPage(page + 1)
    };



    useEffect(() => {
        axios.get(`${url}?per_page=5&page=${page}`)
            .then((res) => {
               setIsLoading(false)
                setRepoList(res.data)
            })
            .catch((err) => {

                if (err.message === "Network Error")
                    setError({
                        hasError: true,
                        errorMessage: "Network Error"
                    }
                    )
                else {
                    if (err.response.status === 403)
                        setError({
                            hasError: true,
                            errorMessage: "Github API limit exceeded, Try Again after some time"
                        }
                        )
                    else setError({
                        hasError: true,
                        errorMessage: "No Such user"
                    }
                    )
                }

               setIsLoading(false)

            })

    }, [url])



    return (

        <div>
            <Typography style={{ margin: "18px 0px 8px 18px", color: "rgb(63,81,181)" }} variant="h6">
                Public Repositories
            </Typography>
            {
                isLoading &&
                <div>
               {
                    [{},{},{},{},{}].map((item,index)=>
                    <Card style={{ borderRadius: "18px",marginBottom:"18px" }} key={index}>
                    <div style={{ padding: "18px" }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} >
                            <div style={{width:"300px",padding:"8px"}}>
                            <ReactPlaceholder type='text' ready={false} rows={4} color='#E0E0E0' showLoadingAnimation={true} />
                            </div>
                            </Grid>
                            
                        </Grid>
                    </div>
                </Card>)
               } 
              
                </div>

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
                    <div className="hideScroll">
                        {(!isLoading) &&
                            <InfiniteScroll
                                
                                dataLength={repoList.length}
                                next={fetchMoreData}
                                hasMore={true}
                              
                              
                            >
                                <Grid container spacing={3}>
                                {
                                    repoList.map((item) =>
                                        <Grid item xs={12} style={{ borderRadius: "18px" }} key={item.id}>
                                            <div style={{ borderRadius: "18px", background:"#ffffff" }}>

                                                <div style={{overflow:"hidden"}}>

                                                    <Grid container>
                                                        <Grid item xs={12} sm={item.language?8:12} style={{padding:"18px"}}>
                                                        <Typography variant='h6'>
                                                    {item.name}
                                                    </Typography>
                                                 
                                                    <Typography variant='caption' style={{color:"#495057"}}>
                                                        {item.description}
                                                    </Typography>
                                                    <Divider style={{marginTop:"8px",marginBottom:"8px"}}/>
                                                    <div style={{display:"flex",flexDirection:"row"}}>
                                                                                                          
                                                        <Typography variant="body2" style={{color:"#ef233c"}}>
                                                            <ErrorOutlineIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} />&nbsp;{item.open_issues_count}
                                                        </Typography>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Typography variant="body2" style={{color:"#ffbe0b"}}>
                                                            <StarOutlineIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} />&nbsp;{item.stargazers_count}
                                                        </Typography>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Typography variant="body2" style={{color:"#43aa8b"}}>
                                                            <DeviceHubIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} />&nbsp;{item.forks_count}
                                                        </Typography>
                                                        &nbsp;&nbsp;&nbsp;
                                                        {item.license && 
                                                        <Typography variant="body2" style={{color:"rgb(63,81,181)"}}>
                                                            <HowToRegIcon style={{ transform: "translateY(2px)", fontSize: "16px" }} />&nbsp;{item.license.name}
                                                        </Typography>
                                                        }  
                                                        </div>        
                                                        </Grid>
                                                        {item.language &&
                                                        <Grid item xs={12} sm={item.language?4:12}>
                                                            <div style={{margin:"18px"}}>
                                                                <Typography variant='subtitle1'>
                                                                    Languages
                                                                </Typography>
                                                                <Graph url={item.languages_url}/>
                                                            </div>

                                                        </Grid>
                                                        }
                                                    </Grid>
                                                   
                                                </div>

                                            </div>
                                        </Grid>
                                    )
                                }
                                 </Grid>
                            </InfiniteScroll>
                        }
                        {(repoList.length === 0 && !isLoading) &&
                          
                                <div style={{ display: 'flex', height: "236px", justifyContent: "center", alignItems: "center" }}>

                                    <GitHubIcon style={{ fontSize: "100px", color: "#495057" }} />
                                    <WarningIcon style={{ position: "absolute", color: "#f48c06", transform: "translate(40px, 45px)", fontSize: "42px" }} />
                                    <Typography style={{ position: "absolute", transform: "translateY(80px)", color: "#495057" }} variant="h6">
                                        {"No Public-Repositories found"}
                                    </Typography>




                                </div>
                            
                        }
                    </div>



            }
        </div>
    )
}

export default Repositories