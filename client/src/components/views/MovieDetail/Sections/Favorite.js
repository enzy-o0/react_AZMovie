import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, Modal } from 'antd'

function Favorite(props) {
    const userFrom = props.userFrom;
    const movieId = props.movieInfoId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const [IsLogin, setIsLogin] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieTime,
    }

    function warning() {
        Modal.warning({
            title: '로그인이 필요한 서비스입니다.',
            content: (
            <div>
                <p>로그인을 해주세요.</p>
            </div>
            ),
            onOk() {

            },
        });
    }

    useEffect(() => {

        localStorage.getItem('userId') && setIsLogin(true)
        
        Axios.post('/api/favorite/favorited',  variables)
        .then(response => {
            if (response.data.success) {
                setFavorited(response.data.favorited)
                console.log(response.data)
            } else {
                alert('사용자 정보를 가져오는데 실패 했습니다.')
            }
        })

    }, [variables])

    const onClickFavorite = () => {
        if (IsLogin) {
            if (Favorited) {
                Axios.post('/api/favorite/favorited/removeFavorite',  variables)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                        setFavoriteNumber(FavoriteNumber - 1)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패 했습니다.')
                    }
                })
            } else {
                Axios.post('/api/favorite/favorited/addFavorite',  variables)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                        setFavoriteNumber(FavoriteNumber + 1)
                        console.log(variables.movieRuntime, response.data)
                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패 했습니다.')
                    }
                })
            }
        } else {
            warning()
        }
    }

    return (
        <div>
            {Favorited? <Button type="danger" style={{ margin: '1em 0', fontSize: '1rem'}} onClick={onClickFavorite}>√ I Want To SEE</Button>      
                :  <Button type="danger" ghost style={{ margin: '1em 0', fontSize: '1rem'}} onClick={onClickFavorite}>+ I Want To SEE </Button>}
        </div>
    )
}

export default Favorite
