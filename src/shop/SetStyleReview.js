import moment from 'moment';
import { useEffect, useState } from 'react';
import ReservationService from '../api/ReservationService';
import './SetStyleReview.css';
export default function SetStyleWindow(props) {
    let [reservation, setReservation] = useState(props.res);
    useEffect(()=>{
        console.log(reservation)
    },[reservation])
    return (
        <div className="popup">
            <div className="set-style-modal">
                <div className="set-modal-header">
                    <h4 class="modal-title">시술 내용</h4>
                    <button onClick={() => props.setStyleWindow(false)} className="title-cancel">✖</button>
                    <hr />
                </div>
                <div className="modal-cont">
                    <div className="modal-cont-detail">
                        <div className="cont-detail-title">
                            예약자
                        </div>
                        <div className="cont-detail-content">
                            {reservation.user.name}
                        </div>
                    </div>
                    <div className="modal-cont-detail">
                        <div className="cont-detail-title">
                            날짜
                        </div>
                        <div className="cont-detail-content">
                            {moment(reservation.startDate).format('YYYY. MM. DD(dd) LT')}
                        </div>
                    </div>
                    <div className="modal-cont-detail">
                        <div className="cont-detail-title">
                            예약한 서비스
                        </div>
                        <div className="cont-detail-content">
                            {reservation.serviceName}
                        </div>
                    </div>

                    <div className="modal-cont-detail">
                        <div className="cont-detail-title">
                            서비스 내용
                        </div>
                        <div className="cont-detail-content">
                            <textarea className="service-cont" onChange={(e) => { setStyle(e.target.value) }}>{props.res.serviceContent}</textarea>
                        </div>
                    </div>
                </div>
                <button className="confirm-button style-confirm" onClick={addStyle}>확인</button>
            </div>
        </div>


    )
    function setStyle(value) {
        setReservation({
            ...reservation,
            serviceContent: value
        })
        
    }
    function addStyle(){
        ReservationService.addStyle(reservation);
        alert('등록완료')
        props.setStyleWindow(false)
        window.location.reload()
    }
}