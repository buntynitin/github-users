import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css";
function Graph({ url }) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [objList, setObjList] = React.useState([])
 
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 15)];
        }
        
        if( color === '#FFFFFF')
            return '#000000'
        return color;
        
      }

    function sum( obj ) {
        var sum = 0;
        for( var el in obj ) {
          if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
          }
        }
        return sum;
      }

    function genObj( obj ){
        var objlist = []
        const total = sum(obj)
     
        for( var el in obj ) {
            if( obj.hasOwnProperty( el ) ) {
                const newobj =  {language:el, percentage:Math.ceil((parseFloat( obj[el] )/total)*100), color: getRandomColor()}
                objlist.push(newobj)
              
            }
          }

          return objlist
    }

   

    React.useEffect(()=>{
        axios.get(url)
            .then((res) => {
                 
                setObjList(genObj(res.data))
                setIsLoading(false)
            
            })
            .catch((err) => {
              setIsLoading(false)
            })
    },[url])
//red 20%,blue 20%, blue 50%,gray 0
//
    return (
        
        <div style={{marginTop:"8px"}}>
        
        
        {

            isLoading?
            <ReactPlaceholder type='textRow' ready={false} color='#E0E0E0' showLoadingAnimation={true} style={{width:"100%",height:"8px",borderRadius:"18px"}} />
            
         
            :
            <div>
            <div style={{display:"flex", flexDirection:"row", width:"100%",borderRadius:"18px",overflow:"hidden", border:"solid gray 0px"}}>
            {
                objList.map((item,index)=>
                <div style={{background:item.color, width:`${item.percentage}%`,height:"8px"}} key={index}>
                </div>
                
                )
            }
       
         </div>
         <div>
                <Grid container spacing={0}>


                {
                   objList.slice(0, Math.min(4, objList.length)).map((item,index)=>
                    <Grid item key={index} xs={6}>
                        
                        <div style={{display:"flex", flexDirection:"row", padding:"8px"}}>
                        <div style={{background:item.color, borderRadius:"50%", width:"15px", height:"15px"}} />
                        <Typography variant="caption" style={{color:"#495057"}}>
                            &nbsp;{item.language}
                        </Typography>
                        </div>
                    </Grid>
                    )
                }  

                </Grid>
        </div>
         </div>
       
    
        }
        
        
        </div>
    )
}
export default Graph
