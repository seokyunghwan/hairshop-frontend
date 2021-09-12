import moment from 'moment';
import { useEffect, useState } from 'react';
import ReservationDetail from '../reservation/ReservationDetail';
moment.locale('ko');
export default function ReservationList(props) {
    let [resDetail, setResDetail] = useState(false);
    let [resInfo, setResInfo] = useState('');
    return (
        <div className="content reservations-content">
            <table>
                <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="30%" />
                    <col width="30%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>매장</th>
                        <th>시술</th>
                        <th>일정</th>
                        <th>예약일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.myReservation == undefined ? 
                        <td colSpan="4" className="no-res-list">예약 내역이 없습니다</td>
                        : props.myReservation?.map(
                            (res, i) =>
                                <tr key={i} onClick={() => showDetailRes(res)}>
                                    <td>{res.shop.shopName}</td>
                                    <td>{res.serviceName}</td>
                                    <td>{moment(res.startDate).format('YYYY. MM. DD(dd) LT')}</td>
                                    <td>{moment(res.resDate).format('YYYY. MM. DD(dd) LT')}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            {resDetail ? <ReservationDetail resInfo={resInfo} setResDetail={setResDetail}/> : null}
        </div>
        
    )
    function showDetailRes(res){
        setResDetail(true)
        setResInfo(res);
    }
    
}
