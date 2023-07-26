import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';


function ImgComponent() {
   
    const [imgData, setImgData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    console.log(page, 'page')

    console.log(imgData, 'response')

   
    
    useEffect(()=>{
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ACCESS_URL}/photos/random?client_id=${process.env.REACT_APP_ACCESS_KEY}&count=6&page=${page}`);
               
                if (response.data && response.data.length > 0) {
                    setImgData(prev => [...prev, ...response.data])
                }
                setLoading(false);
            } catch (error) {
                setError(error)
                setLoading(false)
            }}
        fetchImage()
    },[page])

    const handleScroll = async () =>{
        console.log("event")
    }

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        return ()=> window.removeEventListener("scroll", handleScroll)
    },[])

    if(error){
        return <div className="text-center fw-bold mt-5 text-info" style={{fontSize: 40}}>Oops! We encountered a problem fetching the data.</div>
    }

  return (
    <>
        <div className='row g-2'>
            {
                Array.isArray(imgData) && imgData.map(imgUrl=>(
                    <div className="col-lg-4 col-sm-4 col-12" key={imgUrl.id}>
                        <Card image={imgUrl} />
                    </div>
                ))
            }
        
        </div>
        <div className="d-flex justify-content-center mt-3 mb-2">
             {
                loading && <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
             }
        </div>
    </>
  )
}

export default ImgComponent