import React, { useState }  from 'react'
import Favorite from './Favorite'
import { Row } from 'antd'
import GridCards from '../../commons/GridCards'
import { API_IMAGE_URL} from '../../../Config'


function MovieInfo(props) {

    let { movie, actors } = props;
    let minutes = Math.floor(movie.runtime / 60);
    let seconds = Math.floor((movie.runtime - minutes * 60));

    const [ActorToggle, setActorToggle] = useState(false)

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <>
            <div className="info" style={{ display: 'flex', flexDirection: 'column', width: '40%', height: '92.9%', backgroundColor: '#141414', color: '#fff', padding: '2rem 2rem 0 2rem', position: 'absolute'}}>
                <div style={{ display: 'flex'}}>
                    { movie.adult && <span>19+</span>}
                    <span style={{ border: '1.5px solid #fff', borderRadius: '5px', padding: '0.5rem', fontWeight: '500'}}>평점 ★ {movie.vote_average}</span>
                </div>
                <h1 style={{ margin: '1rem 0', color: '#fff'}}>{movie.original_title}</h1>
                <span> {movie.release_date} / {minutes}시간 {seconds}분</span>
                <Favorite 
                        movieInfoId={props.movieId}
                        movieInfo={movie}
                        userFrom={localStorage.getItem('userId')}/>
                <span style={{ padding: '0.5rem 0', fontSize: '1.2rem'}}> {movie.overview} </span>

                { /* Actors Grid */}
                <div style={{ display: 'flex', padding: '0.5rem 0', color: '#fff'}}>
                    <span ghost style={{ fontSize: '1rem', borderBottom: 'solid'}} onClick={toggleActorView}> Actor Info more </span>
                </div>
                <br />
                { /* Actors Grid Cards */ }
                { ActorToggle &&
                    <div style={{ overflowY: 'auto'}}>
                        <Row gutter={[16, 16]}>
                            { console.log(actors)}
                            { actors && actors.map((actor, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={actor.profile_path ?
                                            `${API_IMAGE_URL}w500${actor.profile_path}` : null}
                                        actorName={actor.name}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                }
            </div>
        </>
    )
}

export default MovieInfo
