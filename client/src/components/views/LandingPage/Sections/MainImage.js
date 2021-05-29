import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

function MainImage(props) {
    
    if (props.landingPage) {

        let { images } = props;

        return (
            <Carousel autoplay effect="fade">
                { images && images.map((image, index) => (
                    <div key={index} style={{ position: 'relative'}}>
                        <Link to={`/movie/${image.id}`} >
                            <img className= "mainImage" 
                                src = {`${process.env.REACT_APP_API_IMAGE_URL}w1280${image.backdrop_path}`}
                                alt="MovieImage"
                                key = {index}>
                            </img>
                            <div className="mainImageDes">
                                <h1 style={{ color: 'white'}}> {image.original_title} </h1>
                                <p> {image.overview} </p> 
                            </div>
                        </Link>   
                    </div>
                )) 
            }
            </Carousel>
        )
    } else {
        return (
            <div style={{width: '100%', position: 'relative'}}>
                <img src = {props.image}
                    style={{ height: '700px',
                            width: '70%',
                            position: 'absolute',
                            top: '0',
                            right: '0'}}
                    alt="MovieImage"
                >
                </img>
            </div>
        )
    }
}

export default MainImage