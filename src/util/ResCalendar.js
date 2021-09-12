import React, { useEffect, useState } from 'react';
import Calendar from '../util/Calendar';
import ReservationTable from '../util/ReservationTable';
import ReservationService from '../api/ReservationService';

export default function ResCalendar(props) {
    const [checkedDate, setCheckedDate] = useState(new Date());
    let [reservations, setReservations] = useState([]);

    useEffect(() => {
        //서버로 날짜 보내서 요청

        ReservationService.getReservationList(checkedDate, props.shopInfo?.id)
            .then((res) => {
                console.log(res.data)
                let array = [];
                for (let i = 0; i < res.data.length; i++) {
                    const modifiedDate = {
                        ...res.data[i],
                        startDate: new Date(res.data[i].startDate),
                        endDate: new Date(res.data[i].endDate),
                        resDate: new Date(res.data[i].resDate),
                    }
                    array.push(modifiedDate)
                }
                setReservations(array);
            })
    }, [checkedDate, props.shopInfo?.id]);

    return (
        <div className="content-body shop-manager">
            <div className="reservation-check">
                <Calendar setCheckedDate={setCheckedDate} />
                <ReservationTable checkedDate={checkedDate} reservations={reservations} ownerCheck={props.ownerCheck} shopInfo={props.shopInfo} />
            </div>

        </div>
    )


}
