import Slider from 'react-slick';
import styled from 'styled-components';
import "./slick.css";
import "./slick-theme.css";
import "./ImageSlider.css";
import { useHistory } from 'react-router';

export default function ImageSlider(props) {
    const history = useHistory();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {props.list?.map(
                (data, i) =>
                    <div>
                        <img onClick={()=>history.push("/searchshop/"+props.shopId)} key={i} src={data.uri} className="big-img"></img>
                    </div>
            )}
        </Slider>
    )
}