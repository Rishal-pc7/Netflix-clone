import React, { useEffect, useRef, useState } from 'react'
import './Rowpost.css'
import ReactPlayer from 'react-player'
import axios from '../../axios'
import { API_KEY, ImgUrl } from '../../Constants/constants'

function Rowpost(props) {
  const [movie,setMovie]=useState([])
  const [url,setUrl]=useState('')
  const imgRef=useRef(null)
  const [position,setPosition]=useState('')
 
   useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovie(response.data.results)

    }).catch((err)=>{
      console.log(err)
    })


   },[])
  

  const handleVideo =(id,e)=>{
    
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      const rect = e.target.getBoundingClientRect()
      
      setPosition(rect.left+'px')
      if(response.data.results.length !== 0){
        
       

        let results=response.data.results
        results.filter(obj => {
          if(obj.type === 'Trailer' || 'Teaser'){
            setUrl(obj)
          }else{
            setUrl(obj[0])
          }

          return obj
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  
 
  return (
    
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters" ref={imgRef} >
        
        
          
        {
          
          
          movie.map((obj,index)=>{

            return(
              
            
                <div>
              <img  onClick={(e)=>handleVideo(obj.id,e)}   className={`${props.isSmall ? 'small-poster' : 'poster'}`} alt='poster' src={`${ImgUrl+obj.backdrop_path}`} />
                
              </div>

            )
          })
          
          
        }
        
        
        
        
        </div>
        {
        
        url &&  <ReactPlayer onEnded={()=>setUrl('')}  className={`${props.isSmall ? 'video-player small-poster' : 'lg-video-player poster'}`} url={`https://www.youtube.com/watch?v=${url.key}`} playing controls width={`${props.isSmall ? '270px' :'446px'}`} height={`${props.isSmall ? '150px' :'260px'}`} style={{left:position,maxHeight:`${props.isSmall ? '150px' : '255px'}`}}/> } 
    </div>
  )
}

export default Rowpost

