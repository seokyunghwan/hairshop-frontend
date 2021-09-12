import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommunityService from '../api/CommunityService';
import NewsService from '../api/NewsService';
import ReservationService from '../api/ReservationService';
import ReservationDetail from '../reservation/ReservationDetail';
import UserService from '../api/UserService';
import './Main.css';
import ShopCard from '../shop/ShopCard';
import Roles from '../config/Roles';
import SetStyleWindow from '../shop/SetStyleReview';
export default function Main(props) {
    const history = useHistory();
    const shopInfo = useSelector(state => state.shopInfo_reducer).shopInfo;
    const role = useSelector(state => state.userInfo_reducer).role;
    let [myReservation, setMyReservation] = useState();
    let [resDetail, setResDetail] = useState(false);
    let [resInfo, setResInfo] = useState('');
    let [news, setNews] = useState();
    let [community, setCommunity] = useState();
    let [bookmark, setBookmark] = useState();

    let [notStyle, setNotStyle] = useState();
    let [todayRes, setTodayRes] = useState();
    let [forStyle, setForStyle] = useState();
    let [styleWindow, setStyleWindow] = useState(false);



    useEffect(() => {
        if (role == Roles.USER) {
            ReservationService.getMyReservation(props.userInfo?.id, 5)
                .then((res) => setMyReservation(res.data._embedded?.reservationGetList));

            

            UserService.getAllBookmark(props.userInfo?.id)
                .then((res) => {
                    setBookmark(res.data)
                })
        } else if (role == Roles.MANAGER && shopInfo) {
            ReservationService.getMainForManager(shopInfo?.id)
                .then((res) => {
                    setNotStyle(res.data.notStyle);
                    setTodayRes(res.data.todayRes);
                });
        }
        NewsService.getAllNews()
                .then((res) => setNews(res.data.content));

            CommunityService.getAllCommunity()
                .then((res) => setCommunity(res.data.content));
    }, [props.userInfo, shopInfo])


    return (
        <div className="content-body">
            <div className="content-group">
                {roleCheck()}
            </div>
            {resDetail ? <ReservationDetail resInfo={resInfo} setResDetail={setResDetail} /> : null}
        </div>
    )

    function showDetailRes(data) {
        setResDetail(true)
        setResInfo(data);
    }

    function UserMain() {
        return (
            <div className="content-main">
                {
                    props.isAuthenticated ?
                        <>
                            <div className="for-reservation">
                                <h5>예약하러 가기</h5>
                                <h6>자주 찾는 매장</h6>
                                <div className="main-favorites">
                                    {
                                        bookmark?.map(
                                            (data, i) =>
                                                <ShopCard bookmark={data} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="main-table res">
                                <div className="main-title">
                                    <h5>최근 예약내역</h5>
                                    <div className="main-more"><Link to="/reservation">더 보기</Link></div>
                                </div>
                                <table>
                                    <colgroup>
                                        <col width="80px" />
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="120px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <td>매장</td>
                                            <td>시술</td>
                                            <td>스타일 기록</td>
                                            <td>일정</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myReservation?.map(
                                                (data, i) =>
                                                    <tr onClick={() => { showDetailRes(data) }}>
                                                        <td>{data.shop.shopName}</td>
                                                        <td>{data.serviceName}</td>
                                                        <td>{data.serviceContent}</td>
                                                        <td>{moment(data.startDate).format('MM/DD LT')}</td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                        : null
                }

                <Boards />

            </div>
        )
    }
    function ManagerMain() {
        if (shopInfo) {
            return (
                <div className="content-main">
                    <div className="main-table recent-res">
                        <h5>작성되지 않은 시술 기록</h5>
                        <table>
                            <colgroup>
                                <col width="100px" />
                                <col width="200px" />
                                <col width="150px" />
                            </colgroup>
                            <thead>
                                <td>예약자</td>
                                <td>날짜</td>
                                <td>시술</td>
                            </thead>
                            <tbody>
                                {notStyle?.map(
                                    (data, i) =>
                                        <tr onClick={() => setComment(data)}>
                                            <td>{data.user.name}</td>
                                            <td>{moment(data.startDate).format('MM/DD LT')}</td>
                                            <td>{data.serviceName}</td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="main-table today-res">
                        <h5>오늘 예약</h5>
                        <table>
                            <colgroup>
                                <col width="100px" />
                                <col width="200px" />
                                <col width="150px" />
                            </colgroup>
                            <thead>
                                <td>예약자</td>
                                <td>시간</td>
                                <td>시술</td>
                            </thead>
                            <tbody>
                                {todayRes?.map(
                                    (data, i) =>
                                        setTodayResList(data)
                                )}
                            </tbody>
                        </table>
                    </div>
                    {
                        styleWindow ? <SetStyleWindow res={forStyle} setStyleWindow={setStyleWindow} /> : null
                    }
                    <Boards />
                </div>
            )
        } else{
            return(
                <div className="content-main no-shop">
                    <h5 className="no-shop-title">등록되어있는 매장이 없습니다</h5>
                    <Boards />
                </div>
            )
        }
    }

    function Boards() {
        return (
            <>
                <div className="main-table">
                    <div className="main-title">
                        <h5>소식</h5>
                        <div className="main-more"><Link to="/news">더 보기</Link></div>
                    </div>
                    <table>
                        <colgroup>
                            <col width="80px" />
                            <col width="100px" />
                            <col width="120px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <td>작성자</td>
                                <td>제목</td>
                                <td>날짜</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                news?.map(
                                    (data, i) =>
                                        <tr onClick={() => {
                                            history.push({
                                                pathname: '/news/' + data.id,
                                                state: {
                                                    post: data
                                                }
                                            })
                                        }}>
                                            <td>{data.writer.userId}</td>
                                            <td>{data.title}</td>
                                            <td>{moment(data.createdTime).format('MM/DD LT')}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="main-table">
                    <div className="main-title">
                        <h5>커뮤니티</h5>
                        <div className="main-more"><Link to="/community">더 보기</Link></div>
                    </div>
                    <table>
                        <colgroup>
                            <col width="80px" />
                            <col width="100px" />
                            <col width="120px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <td>작성자</td>
                                <td>제목</td>
                                <td>날짜</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                community?.map(
                                    (data, i) =>
                                        <tr onClick={() => {
                                            history.push({
                                                pathname: '/community/' + data.id,
                                                state: {
                                                    post: data
                                                }
                                            })
                                        }}>
                                            <td>{data.writer.userId}</td>
                                            <td>{data.title}</td>
                                            <td>{moment(data.createdTime).format('MM/DD LT')}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    function roleCheck() {
        if (role == Roles.USER) {
            return (<UserMain />)
        } else if (role == Roles.MANAGER) {
            return (<ManagerMain />)
        }
    }

    function setComment(res) {
        setStyleWindow(!styleWindow);
        setForStyle(res);
    }

    function setTodayResList(data) {
        if (new Date() < new Date(data.startDate)) {
            return (
                <tr>
                    <td>{data.user.name}</td>
                    <td>{moment(data.startDate).format('LT')}</td>
                    <td>{data.serviceName}</td>
                </tr>
            )
        } else {
            return (
                <tr className="end-res">
                    <td>{data.user.name}</td>
                    <td>{moment(data.startDate).format('LT')}</td>
                    <td>{data.serviceName}</td>
                </tr>
            )
        }
    }
}