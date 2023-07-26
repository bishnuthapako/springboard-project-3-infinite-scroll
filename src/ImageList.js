import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from "./Card";

function ImageList() {
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchImages(10);
        // set loaded to true here, to start loading images when the component mounts
        setLoaded(true);
    }, []);  // removed images from dependencies

    const fetchImages = async (count = 6) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCESS_URL}/photos/random?client_id=${process.env.REACT_APP_ACCESS_KEY}&count=${count}`);
            if (response.data) {
                setImages(prevImages => [...prevImages, ...response.data]);
            }
        } catch (error) {
            setErrors(error);
        }
    };

    if(errors){
                return <div className="text-center fw-bold mt-5 text-info" style={{fontSize: 40}}>Oops! We encountered a problem fetching the data.</div>
            }

    return (
        <>
            <div className='container'>
                <InfiniteScroll
                    dataLength={images.length}  // fixed to images.length
                    hasMore={true}
                    loader={
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <img src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif" alt="loading" />
                        </div>
                    }
                    next={() => fetchImages(6)}  // fixed to a function reference
                >
                    <div className="row g-2">
                    {
                        loaded && Array.isArray(images) && images.map(img => (
                            <div className="col-lg-4 col-sm-4 col-12" key={img.id}>
                                <Card image={img} />
                            </div>
                        ))
                    }
                    </div>
                    
                </InfiniteScroll>
            </div>
           
        </>
    );
}

export default ImageList;
