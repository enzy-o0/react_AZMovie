import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'antd'

function Favorite(props) {
    const user = useSelector(state => state.user)

    const userFrom = props.userFrom;
    const movieId = props.movieInfoId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

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
                props.history.push("/login");
            },
        });
    }

    useEffect(() => {        
        const fetchListData = async() => {
            const resultList = await Axios.post('/api/favorite/favorited',  variables);
            if (resultList.data.success) {
                setFavorited(resultList.data.favorited)
            } else {
                alert('사용자 정보를 가져오는데 실패 했습니다.')
            }
        }

        fetchListData();
    }, [variables])

    const onClickFavorite = async () => {
        if (user.userData && user.userData.isAuth) {
            if (Favorited) {
                const resultRemove = await Axios.post('/api/favorite/favorited/removeFavorite',  variables);
                if (resultRemove.data.success) {
                    setFavorited(!Favorited)
                    setFavoriteNumber(FavoriteNumber - 1)
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패 했습니다.')
                }
            } else {
                const resultAdd = await Axios.post('/api/favorite/favorited/addFavorite',  variables);
                if (resultAdd.data.success) {
                    setFavorited(!Favorited)
                    setFavoriteNumber(FavoriteNumber + 1)
                } else {
                    alert('Favorite 리스트에서 추가하는 걸 실패 했습니다.')
                }
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

export default withRouter(Favorite)
