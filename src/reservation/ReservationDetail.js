import './ReservationDetail.css';
import moment from 'moment';
import ImageSlider from '../util/ImageSlider';
import ReservationService from '../api/ReservationService';
import { useState } from 'react';
import { useHistory } from 'react-router';
moment.locale('ko');

export default function ReservationDetail(props) {
    let [review, setReview] = useState('');
    const history = useHistory();
    const shopImageBaseUrl = 'http://localhost:8083/shopImg';
    return (
        <div className="popup res-detail">
            <div className="res-detail-modal">
                <div>
                    <h4 className="res-title" onClick={()=>history.push("/searchshop/"+props.resInfo.shop.id)}>{props.resInfo.shop.shopName}</h4>
                    <button className="res-title title-cancel" onClick={() => props.setResDetail(false)} >✖</button>
                </div>
                <hr />
                <div className="res-info">
                    <div className="shop-image">
                        <ImageSlider list={props.resInfo.shop.image} baseUrl={shopImageBaseUrl + '/' + props.resInfo.shop.id + '_'} shopId = {props.resInfo.shop.id}/>
                    </div>
                    <div className="res-detail-info">
                        <div className="info-list">
                            <div className="info-title">
                                일정
                            </div>
                            <div className="info-desc">
                                {moment(props.resInfo.startDate).format('YYYY. MM. DD(dd) LT')}
                            </div>

                        </div>


                        <div className="info-list">
                            <div className="info-title">
                                주소
                            </div>
                            <div className="info-desc">
                                {props.resInfo.shop.shopAddress}
                            </div>
                        </div>
                        <div className="info-list">
                            <div className="info-title">
                                연락처
                            </div>
                            <div className="info-desc">
                                {props.resInfo.shop.shopTel}
                            </div>
                        </div>
                        <div className="info-list">
                            <div className="info-title">
                                가격
                            </div>
                            <div className="info-desc">
                                {numberWithCommas(props.resInfo.price)} 원
                            </div>
                        </div>
                        <div className="info-list">
                            <div className="info-title">
                                시술
                            </div>
                            <div className="info-desc">
                                {props.resInfo.serviceName}
                            </div>
                        </div>
                        <div className="info-list">
                            <div className="info-title">
                                시술정보
                            </div>
                            <div className="info-desc">
                                {
                                    props.resInfo.shop.product.map(
                                        (data, i) => props.resInfo.serviceName === data.serviceName ?
                                            data.productInfo
                                            : ''
                                    )
                                }
                            </div>
                        </div>
                        {showCancel()}
                    </div>
                </div>
                {showReview()}
            </div>
        </div>
    )
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function cancelRes() {
        if (window?.confirm('예약을 취소하시겠습니까?')) {
            ReservationService.cancelReservation(props.resInfo.id);
            props.setResDetail(false);
            window.location.reload()
        }
    }
    function showCancel() {
        if (new Date(props.resInfo.startDate) > new Date()) {
            return (
                <div className="res-cancel">
                    <button className="cancel-button" onClick={cancelRes}>예약 취소</button>
                </div>
            )
        }
    }
    function showReview() {
        if ((new Date(props.resInfo.startDate) <= new Date())) {
            if (!props.resInfo.review) {
                return (
                    <div>
                        <div className="review">
                            리뷰
                        </div>
                        <div className="review-frame">
                            <input className="review-input" onChange={(e) => setReview(e.target.value)}></input>
                            <button className="review-ok" onClick={updateReview}>등록</button>
                        </div>
                    </div>
                )
            } else{
                return(
                    <div className="review-frame already">
                        이미 리뷰를 작성하셨습니다
                    </div>
                )
            }
        }
    }

    function updateReview() {
        ReservationService.updateReview(props.resInfo.id, review);
        alert('리뷰가 등록되었습니다');
        props.setResDetail(false);
        window.location.reload()
    }
}