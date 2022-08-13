import React, { useEffect, useState } from 'react'
import './Banner.css'
import  axios from '../../axios'  
import { API_KEY, ImgUrl } from '../../Constants/constants'

function Banner() {
   const [movie,setMovie]= useState()
  useEffect(()=>{
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response)
      setMovie(response.data.results[2])
    }).catch((err)=>{
      console.log(err)
    })
    

  },[])
  return (
    <div className='banner' style={{backgroundImage:`url(${movie ? ImgUrl+movie.backdrop_path : ""} )`}}>
        <div className="content">
            <h1 className="title">{movie ? movie.title : ''}</h1>
            <div className="buttons">
                <button className="button">Play</button>
                <button className="button">Add to List</button>
            </div>
            <h1 className='description'>{movie ? movie.overview : ''}</h1>
        </div>

        <div className="fade_bottom"></div>
      
    </div>
  )
}

export default Banner
