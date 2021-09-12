/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ReservationService from '../api/ReservationService';
import './Profile.css';
import ReservationList from '../reservation/ReservationList';
import UserService from '../api/UserService';
import ShopCard from '../shop/ShopCard.js';
import moment from 'moment';

function Profile() {
    let userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    let [myReservation, setMyReservation] = useState([]);
    let [bookmark, setBookmark] = useState([]);
    
    useEffect(() => {
        ReservationService.getMyReservation(userInfo?.id)
            .then((res) => {
                setMyReservation(res.data._embedded?.reservationGetList)
            })
        UserService.getAllBookmark(userInfo?.id)
            .then((res)=>{
                setBookmark(res.data)
            })
    }, [])

    
    return (
        <div className="content-body profile">
            <div className="content-group">
                <div className="content-title mystyle">
                    <h4>최근 시술 기록</h4>
                    <p>최근 받은 시술에 대한 기록입니다</p>
                </div>
                <div className="content mystyle">
                    <table>
                        <colgroup>
                            <col width="150px" />
                            <col width="300px" />
                            <col width="*" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>매장</th>
                                <th>날짜</th>
                                <th>기록</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myReservation?.map(
                                    (d, index) =>
                                        <tr key={index}>
                                            <td>{d.shop.shopName}</td>
                                            <td>{moment(d.startDate).format('YYYY. MM. DD(dd) LT')}</td>
                                            <td>{d.serviceContent}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="content-group">
                <div className="content-title reservations-title">
                    <h4>예약 내역</h4>
                    <div className="more"><Link to="/reservation">더 보기</Link></div>
                </div>
                <ReservationList myReservation={myReservation}/>
            </div>
            <div className="content-group">
                <div className="content-title favorites">
                    <h4>자주 찾는 매장</h4>
                </div>
                <div className="content favorites-content">
                    {bookmark.map(
                        (data, i) =>
                            <ShopCard bookmark={data}/>
                    )}
                </div>
            </div>
            
        </div>
    )
}

export default Profile;