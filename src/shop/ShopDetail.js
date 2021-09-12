/*eslint-disable*/
import './ShopDetail.css';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import ShopService from '../api/ShopService';
import ImageSlider from '../util/ImageSlider';
import ResCalendar from '../util/ResCalendar';

import { ReactComponent as Address } from '../img/icon/address.svg';
import { ReactComponent as Phone } from '../img/icon/phone.svg';
import { ReactComponent as Time } from '../img/icon/time.svg';
import { ReactComponent as Info } from '../img/icon/info.svg';
import { ReactComponent as Price } from '../img/icon/price.svg';
import { useSelector } from 'react-redux';
import UserService from '../api/UserService';
import ReservationService from '../api/ReservationService';

function ShopDetail() {
    const userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    const shopImageBaseUrl = 'http://localhost:8083/shopImg';
    const location = useLocation();
    let { id } = useParams();
    let [shopResList, setShopResList] = useState();
    let [shopDetail, setShopDetail] = useState('');
    let [bookmarkOn, setBookMarkOn] = useState();
    let [bookmark, setBookmark] = useState();
    let [ownerCheck, setOwnerCheck] = useState(false);
    // let [image, setImage] = useState();
    useEffect(() => {
        if (location.state) {
            ShopService.getHateoasInfo(location.state.link) //SearchShop에서 location으로 link 전달
                .then((res) => {
                    var r = timeSet(res.data.openTime, res.data.closeTime);
                    setShopDetail({
                        ...res.data,
                        openTime: r.open,
                        closeTime: r.close
                    });
                })
        } else {
            ShopService.getShopInfo(id) //검색 결과가 아닌 url에서 id 입력해서 들어올 경우
                .then((res) => {
                    var r = timeSet(res.data.openTime, res.data.closeTime);
                    setShopDetail({
                        ...res.data,
                        openTime: r.open,
                        closeTime: r.close
                    });
                })
        }

        UserService.getAllBookmark(userInfo?.id)
            .then((res) => {
                setBookmark(res.data);
            });

        ReservationService.getReview(id)
            .then((res) => {
                console.log(res.data.content)
                setShopResList(res.data.content)
            });
    }, [])
    useEffect(() => {
        for (let i = 0; i < bookmark?.length; i++) {
            if (bookmark[i].shop.id == id) {
                setBookMarkOn(true);
                break;
            }
            if (i == bookmark.length - 1) {
                setBookMarkOn(false);
            }
        }
    }, [bookmark])


    useEffect(() => {
        if (userInfo?.id === shopDetail.owner?.id) {
            setOwnerCheck(true);
        }
    }, [shopDetail, userInfo])



    function timeSet(ot, ct) {
        var open = moment(ot).format('HH:mm');
        var close = moment(ct).format('HH:mm');
        var r = { open, close }
        return r;
    }


    return (
        <div className="content-body shop-detail">
            <div className="content-group">
                <div className="content-title">
                    <h4>매장소개</h4>
                </div>
                <div className="content shop-detail-content">
                    <div className="shop-images">
                        <ImageSlider list={shopDetail?.image} baseUrl={shopImageBaseUrl + '/' + id + '_'} />
                    </div>
                    <div className="shop-detail-info">
                        <div className="shop-title">
                            <div className="shop-name">{shopDetail.shopName}</div>
                            <button className={bookmarkOn ? "bookmark on" : "bookmark"} onClick={(e) => { bookmarkChange(e) }}></button>
                        </div>
                        <div className="detail-info"><Address className="shopinfo-icon" />{shopDetail.shopAddress}</div>
                        <div className="detail-info"><Phone className="shopinfo-icon" />{shopDetail.shopTel}</div>
                        <div className="detail-info"><Time className="shopinfo-icon" />
                            {shopDetail.openTime} - {shopDetail.closeTime}
                        </div>
                        <div className="detail-info"><Info className="shopinfo-icon" />{shopDetail.shopInfo}</div>
                        <div className="detail-info"><Price className="shopinfo-icon" />
                            <div className="price-list">
                                {shopDetail.product?.map(
                                    (data, i) => <div className="price"><div className="product-name">{data.serviceName}</div><div className="product-price">{numberWithCommas(data.price)} 원</div></div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="content-group">
                <div className="content-title"><h4>예약</h4></div>
                <div className="reservation-check">
                    <ResCalendar shopInfo={shopDetail} ownerCheck={ownerCheck} />
                </div>
            </div>
            <div className="content-group">
                <div className="content-title">
                    <h4>리뷰</h4>
                </div>
                <div className="content review-content">
                    <table>
                        <colgroup>
                            <col width="100px"/>
                            <col width="*"/>
                            <col width="150px"/>
                            <col width="150px"/>
                        </colgroup>
                        <thead>
                            <td>작성자</td>
                            <td>내용</td>
                            <td>시술명</td>
                            <td>시술일자</td>
                        </thead>
                        <tbody>
                            {shopResList?.map(
                                (data, i) => 
                                <tr>
                                    <td>{data.user.userId}</td>
                                    <td>{data.review}</td>
                                    <td>{data.serviceName}</td>
                                    <td>{moment(data.startDate).format('YY.MM.DD')}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function bookmarkChange(e) {
        if (bookmarkOn) {
            UserService.deleteBookmark(userInfo.id, shopDetail.id)
        } else {
            UserService.setBookmark(userInfo.id, shopDetail.id)
        }
        setBookMarkOn(!bookmarkOn)

    }
}

export default ShopDetail;
