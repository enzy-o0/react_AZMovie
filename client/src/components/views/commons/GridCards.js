import React from 'react'
import { Col, Button, Empty } from 'antd'
import { useMediaQuery } from 'react-responsive'

function GridCards(props) {

    const isDeskTop = useMediaQuery({
        query : "(min-width:1024px)"
    });
    
    const isTablet = useMediaQuery({
        query : "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    });

    const setImageHeight = (height) => (
        <img style={{width: '100%', height: height, borderRadius: '10px'}} src={props.image} alt= {props.movieName}/>
    )
    
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={12}>
                <a href = {`/movie/${props.movieId}`}>
                    <div className="mainImageMore" >
                    {/* style={{ position: 'relative', overflow: 'hidden'}}> */}
                        <div className="moreInfo" style={{ width: '60%', display: 'flex', flexDirection: 'column'}}>
                            <span style={{ color: '#fff', fontSize: '18px', marginBottom: '1rem'}}>{props.movieName}</span>
                            <Button ghost>더보기</Button>
                        </div>
                        {/* style={{ position: 'absolute', bottom: '100%', left: '35%', zIndex: '2'}}>더보기</Button> */}
                        { isDeskTop &&  setImageHeight('30rem')}
                        { isTablet && setImageHeight('20rem')}
                        { isMobile && setImageHeight('15rem')}
                    </div>
                </a>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={12}>
                <div className="detailImage">
                    { props.image && <span className="detailImageInfo" style={{ color: '#fff', fontSize: '14px'}}>{props.actorName}</span>}
                    { props.image ? <img style={{width: '100%', height: '10rem'}} src={props.image} alt= {props.actorName} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}  description={false} style={{width: '100%', height: '6rem', color: '#fff'}}> {props.actorName}</Empty> }
                </div>
            </Col>
        )
    }
}

export default GridCards
