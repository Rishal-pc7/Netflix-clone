import React, { useEffect, useState } from 'react'
import './Banner.css'
import  axios from '../../axios'  
import { API_KEY, ImgUrl } from '../../Constants/constants'
import ReactPlayer from 'react-player/lazy'
function Banner() {
   const [movie,setMovie]= useState()
   const [video,setVideo]= useState()
   let pos=parseInt(localStorage.getItem('posi')) 
   useEffect(()=>{
     axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US&include_title=1`).then((response)=>{
      let results=response.data.results
      if(localStorage.getItem('FirstLoad') === null){
        pos=0
        localStorage.setItem('FirstLoad','1')
        localStorage.setItem('posi',0)
      }else{
        if(pos < 19){
          
          localStorage.setItem('posi',pos+1)
        }else{
          localStorage.setItem('posi',0)
          
        }
        
      }
      
      setMovie(results[pos])
    }).catch((err)=>{
      console.log(err)
    })
    

  },[])
  
  const handlevideo =(id,type)=>{
    axios.get(`/${type}/${id}/videos?api_key=${API_KEY}`).then((data)=>{
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
    <div>
        {
          video ? <div className="banner">
            <ReactPlayer onEnded={()=>setVideo('')}  className={'video-player'} url={`https://www.youtube.com/watch?v=${video.key}&controls=0&showinfo=0`} playing width={`100%`} height={`78%`} />
          </div> 
          : <div className='banner' style={{backgroundImage:`url(${movie ? ImgUrl+movie.backdrop_path : ""} )`}}>
          <div className="content">
              <h1 className="title">{movie ? movie.title || movie.name: ''}</h1>
              <div className="buttons">
                  <button className="button" onClick={()=>handlevideo(movie.id,movie.media_type)}>Play</button>
                  <button className="button">Add to List</button>
              </div>
              <h1 className='description'>{movie ? movie.overview : ''}</h1>
          </div>
  
          <div className="fade_bottom"></div>
        
      </div>
        }

    </div>
    
  )
}

export default Banner
