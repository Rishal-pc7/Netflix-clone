import React, { useEffect, useRef, useState } from 'react'
import './Rowpost.css'
import axios from '../../axios'
import { API_KEY, ImgUrl } from '../../Constants/constants'
import ReactPlayer from 'react-player/lazy'

function Rowpost(props) {
  const [movie,setMovie]=useState([])
  const imgRef=useRef(null)
  const [video,setVideo] = useState('')
   useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovie(response.data.results)
    }).catch((err)=>{
      console.log(err)
    })


   },[props.url])
  
   const handleVideo =(id)=>{
     axios.get(`/${props.type}/${id}/videos?api_key=${API_KEY}`).then((data)=>{
      let results = data.data.results
      let videos = results.filter(video =>{
        if((video.type === 'Trailer' || video.type === 'Teaser') && video.official){
          return video
        }
        return false
      } )
      console.log(videos[0])
      setVideo({key:videos[0].key,id:id})
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
              
            
              <img onClick={()=>handleVideo(obj.id)} className={`${props.isSmall ? 'small-poster' : 'poster'}`} alt='poster' src={`${ImgUrl+obj.backdrop_path}`} />
                

              {
                video.id === obj.id && video && <ReactPlayer onEnded={()=>setVideo('')}  className={'video-player'} url={`https://www.youtube.com/watch?v=${video.key}`} playing controls width={`${props.isSmall ? '270px' :'446px'}`} height={`${props.isSmall ? '170px' :'270px'}`} style={{}}/> 
              }
            </div> 
            )
          })
          
        }
        
        
        
        
        </div>
        
    </div>
  )
}

export default Rowpost

