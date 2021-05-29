import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './favorite.css'
import { Row, Col, Empty } from 'antd'

function FavoritePage() {

    const userFrom = localStorage.getItem('userId')

    const [FavoriteMovie, setFavoriteMovie] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const result = await Axios.post('/api/favorite/favorited/list',  {userFrom});
            if (result.data.success) {
                setFavoriteMovie(result.data.favorite)
            } else {
                alert('보고싶은 영화 정보를 가져오는데 실패 했습니다.')
            }
        }
        
        fetchData();
    }, [userFrom])

    const renderLists = FavoriteMovie.map((favorite, index) => {
        
        return  <Col lg={6} md={8} xs={12} key={index}>
            <div style={{ textAlign: 'center'}}>
                <a href = {`/movie/${favorite.movieId}`}>
                    { favorite.moviePost ? <img className="favoriteMovieImage"  src={`${process.env.REACT_APP_API_IMAGE_URL}w500${favorite.moviePost}`} alt= {favorite.movieTitle} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}  description={false} style={{width: '100%', height: '6rem', color: '#fff'}}> {favorite.movieTitle}</Empty> }
                    <span className="title">{favorite.movieTitle}</span>
                </a>
            </div>
        </Col>  
    })

    return (
        <div className="favorite">
            <h1 style={{ color: '#fff', fontWeight: '600'}}> 회원님이 보고싶어하는 영화 </h1>
            <hr />

            { /* Movie Grid Cards */ }
            <Row id="id" gutter={[16, 16]}>
                {renderLists}
            </Row>
        </div>   
    )
}

export default FavoritePage
