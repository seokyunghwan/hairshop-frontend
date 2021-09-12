import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import ReservationService from "../api/ReservationService";
import ReservationList from "./ReservationList.js";

export default function Reservation(props) {
    const userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    const location = useLocation();
    let [myReservation, setMyReservation] = useState();
    let [pageInfo, setPageInfo] = useState();
    useEffect(() => {
        ReservationService.getMyReservation(userInfo.id, 10)
            .then((res) => {
                setMyReservation(res.data._embedded?.reservationGetList);
                setPageInfo(res.data);
                console.log(res.data)
            })
    }, [])

    return (
        <div className="content-body">
            <div className="content-group">
                <div className="content-title">
                    <h4>예약내역</h4>
                </div>
                <div className="content">
                    <ReservationList myReservation={myReservation} />
                    <div className="page-nums">{pageNum()}</div>
                </div>
            </div>
        </div>
    )

    function pageNum(){
        var array = [];
        for(let i=0 ; i<pageInfo?.page.totalPages ; i++){
            array.push(<button className="page-num" onClick={getPage} value={i}>{i+1}</button>)
        }
        return array;
    }
    function getPage(e){
        ReservationService.getPageInfo('http://localhost:8083/api/reservation?id='+userInfo.id+'&page='+e.target.value+'&size=10&sort=endDate,desc')
            .then((res)=>{
                setMyReservation(res.data._embedded.reservationGetList);
            })
    }
}