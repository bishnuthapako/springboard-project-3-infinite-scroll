import React from 'react'

function Card({image}) {
    const {urls} = image;
    
  return (
    <img src={urls.full} className="img-thumbnail" alt="Unplash Images" />
  )
}

export default Card