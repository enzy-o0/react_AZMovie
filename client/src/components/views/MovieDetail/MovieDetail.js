import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import MovieInfo from './Sections/MovieInfo'
import { useMediaQuery } from 'react-responsive'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Actor, setActor] = useState([])

    useEffect(() => {
        const endpointInfo = `${process.env.REACT_APP_API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
        const endpointActor = `${process.env.REACT_APP_API_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`

        const fetchInfoData = async() => {
            const resultInfo = await Axios.get(endpointInfo);
            setMovie(resultInfo.data)
        }

        const fetchActorData = async() => {
            const resultActor = await Axios.get(endpointActor);
            setActor(resultActor.data.cast)
        }

        fetchInfoData();
        fetchActorData();

    }, [movieId])

    
    const isDeskTop = useMediaQuery({
        query : "(min-width:1024px)"
    });
    
    const style = () => {
        if (isDeskTop) {
            return {backgroundImage: `linear-gradient(to left, rgba(20, 20, 20, 0) 40%, rgba(20, 20, 20, 0.25) 50%, rgba(20, 20, 20, 0.5) 60%, rgba(20, 20, 20, 0.75) 70%, rgba(20, 20, 20, 1) 80%), url(${process.env.REACT_APP_API_IMAGE_URL}w1280${Movie.backdrop_path})`}
        }  else {
            return {backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0) 80%, rgba(20, 20, 20, 0.25) 85%, rgba(20, 20, 20, 0.5) 90%, rgba(20, 20, 20, 0.75) 95%, rgba(20, 20, 20, 1) 100%), url(${process.env.REACT_APP_API_IMAGE_URL}w500${Movie.backdrop_path})`}
        }
    }    

    return (
        <div className="details" style={{ width: '100%'}}>
            <div className="image" style={style()}>
            </div>
            <div style={{ width: '100%'}}>
                {/* Main Image */}
                {Movie && 
                        <MovieInfo 
                            movieId = {movieId}
                            movie={Movie}
                            actors={Actor}
                        /> 
                }
            </div>
        </div>
    )
}

export default MovieDetail
