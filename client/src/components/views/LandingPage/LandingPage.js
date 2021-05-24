import React, { useEffect, useState, useCallback } from 'react'
import { API_URL, API_KEY, API_IMAGE_URL } from '../../Config'
import GridCards from '../commons/GridCards'
import { Row, Spin } from 'antd'
import MainImage from './Sections/MainImage'

function LandingPage() {

    const [Movies, setMovies] = useState ([])
    const [MainMovieImage, setMainMovieImage] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [ShowLoading, setShowLoading] = useState(false)

    const fetchMovies = async(endpoint) => {
        setShowLoading(true)

        const response = await fetch(endpoint);
        const fetchMovies = await response.json();

        setMovies([...Movies, ...fetchMovies.results]);

        let randomArray = [];

        for(let i = 0; i < 3; i++) { // 배너 랜덤으로 3가지 
            let n = fetchMovies.results[Math.floor(Math.random() * fetchMovies.results.length)];

            if(randomArray.find(random => random === n)) {
                i--;
            } else {
                randomArray.push(n)
            }
        }
        setMainMovieImage(randomArray)
        setCurrentPage(fetchMovies.page)
        setShowLoading(false)
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }


    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, [])

    
    const _infiniteScroll = useCallback(() => { // 두번째 인자인 배열 내의 값이 변경될때까지 저장해놓고 재사용
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // 스크롤의 전체 높이
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop); // 스크롤 전체로부터 내려온 값
        let clientHeight = document.documentElement.clientHeight; // 현재 보고있는 스크롤 위치값

        if (scrollTop + clientHeight === scrollHeight) {
            loadMoreItems()
        }
    }, [Movies, CurrentPage]);

    useEffect(() => {
        window.addEventListener('scroll', _infiniteScroll, true)
        return () => window.removeEventListener('scroll', _infiniteScroll, true);
    }, [_infiniteScroll])

    return (
        <div style={{width: '100%', margin: '0', backgroundColor: '#141414'}}>
            <div style={{width: '100%', margin: '0'}}>
                {/* Main Image */}
                {MainMovieImage && 
                    <MainImage 
                        landingPage
                        images={MainMovieImage}
                    /> 
                }
            </div>
            <div style={{width: '85%', margin: '2rem auto'}}>
                <h2 style={{color: '#fff'}}>Current Popular Movies</h2>

                { /* Movie Grid Cards */ }
                <Row id="id" gutter={[16, 16]}>
                    { Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${API_IMAGE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                { ShowLoading && <div style={{width: '100%', height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Spin tip="Loading..."></Spin>
                </div>}   
            </div>
        </div>
    )
}

export default LandingPage
