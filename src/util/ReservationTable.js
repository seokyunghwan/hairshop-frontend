/*eslint-disable*/
import { useState, useEffect } from 'react';
import SetStyleWindow from '../shop/SetStyleReview';
import './ReservationTable.css';
import ResWindow from './ResWindow';

function ReservationTable(props) {
    const week_array = new Array('일', '월', '화', '수', '목', '금', '토');
    const week_array_eng = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    const time = [];
    let [week, setWeek] = useState([]);
    let [date, setDate] = useState(new Date());
    let [clickedDate, setClickedDate] = useState('');
    let [reswindow, setReswindow] = useState(false);
    let [availableProduct, setAvailableProduct] = useState([]);
    let [styleWindow, setStyleWindow] = useState(false);
    let [forStyle, setForStyle] = useState();
    const reservations = props.reservations;

    let startHour = 10;
    for (let i = 0; i < 20; i++) {
        if ((startHour - 0.5) % 1 == 0) {
            time.push(startHour - 0.5 + ":30")
        } else {
            time.push(startHour + ":00")
        }
        startHour += 0.5;
    }
    // console.log(reservations);
    useEffect(() => {
        setDate(new Date(props.checkedDate.getFullYear(), props.checkedDate.getMonth(), props.checkedDate.getDate()));
    }, [props.checkedDate])


    useEffect(() => {
        setWeek(makeWeekArr(date));
    }, [date])
    let schedules = new Array(20);
    for (let i = 0; i < schedules.length; i++) {
        schedules[i] = new Array(8);
    }

    for (let row = 0; row < 20; row++) {
        for (let column = 0; column < 8; column++) {
            if (column == 0) {
                schedules[row][column] = <td>{time[row]}</td>
            } else {
                if (new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + column - 1, 10, date.getMinutes() + row * 30, date.getSeconds()) > new Date()) {
                    if (props.ownerCheck) {
                        schedules[row][column] = <td></td>
                    } else {
                        schedules[row][column] = <td onClick={() => getClickedDate(row, column)}></td>
                    }
                }
                else {
                    schedules[row][column] = <td className="no-res"></td>
                }
            }
        }
    }

    for (let i = 0; i < reservations.length; i++) {
        let h = (reservations[i].startDate.getHours() - 10) * 2;    //row 위치
        if (reservations[i].startDate.getMinutes() == 30) {
            h++;
        }
        for (let j = 0; j < week.length; j++) {
            if (week[j][1].getDate() == reservations[i].startDate.getDate()) {    //column 위치
                let row = (reservations[i].endDate - reservations[i].startDate) / 1800000;  //시술 시간 계산
                for (let k = 1; k < row; k++) {
                    schedules[h + k][reservations[i].startDate.getDay() + 1] = null;    // 밀린 row들 삭제
                }
                //스케줄 입력
                if (props.ownerCheck) {
                    schedules[h][reservations[i].startDate.getDay() + 1] = <td rowSpan={row} onClick={() => setComment(reservations[i])}>{reservations[i].user.name} / {reservations[i].serviceName}</td>
                } else {
                    schedules[h][reservations[i].startDate.getDay() + 1] = <td rowSpan={row} className="no-res">예약완료</td>
                }
            }
        }
    }



    function makeWeekArr(date) {
        let day = date.getDay();
        let weeks = [];
        for (let i = 0; i < 7; i++) {
            let newDate = new Date(date.valueOf() + 86400000 * (i - day));
            weeks.push([i, newDate]);
        }
        return weeks;
    }
    return (
        <div className="reservation-table">
            <table className="week-table">
                <colgroup>
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                    <col width="100px" />
                </colgroup>
                <thead>
                    <tr>
                        <td></td>
                        {days()}
                    </tr>
                </thead>
                <tbody>
                    {setResListTr()}
                </tbody>
            </table>
            {
                reswindow ? <ResWindow availableProduct={availableProduct} shopInfo={props.shopInfo} setReswindow={setReswindow} clickedDate={clickedDate} setAvailableProduct={setAvailableProduct} /> : null
            }
            {
                styleWindow ? <SetStyleWindow res={forStyle} setStyleWindow={setStyleWindow}/> : null
            }

        </div>
    )

    //위 날짜 입력 thead
    function days() {
        return (
            week.map(
                (d, index) =>
                    <td key={index} className={"days " + week_array_eng[d[1].getDay()]}>
                        <div className="day">
                            {week_array[d[1].getDay()]}
                        </div>
                        <div className="date">
                            {d[1].getDate()}
                        </div>
                    </td>
            )
        )
    }

    //tr 한 줄 입력
    function setResListTr() {
        return (
            schedules.map(
                (data, index) =>
                    <tr>
                        {
                            data.map(
                                (reservationInfo, i) =>
                                    reservationInfo
                            )
                        }
                    </tr>
            )
        )
    }
    function getClickedDate(row, column) {
        var formData = new FormData();
        var arr = [...availableProduct];
        for (let i = 0; i < props.shopInfo.product.length; i++) {
            let requiredHour = parseInt(props.shopInfo.product[i].requiredTime.substr(0, 2));
            let requiredMin = parseInt(props.shopInfo.product[i].requiredTime.substr(2, 2));
            var r = requiredHour * 2 + (requiredMin / 30)
            for (let j = row; j < row + r; j++) {
                if (j >= 20 || schedules[j][column]?.props.children === '예약완료') {
                    var temp = props.shopInfo.product[i];
                    temp = {
                        ...props.shopInfo.product[i],
                        available: false,
                    }
                    arr.push(temp);
                    // console.log('예약불가' , props.shopInfo.product[i].serviceName)
                    break;
                }
                if (j === row + r - 1) {
                    // console.log('예약가능', props.shopInfo.product[i].serviceName)
                    var temp = props.shopInfo.product[i];
                    temp = {
                        ...props.shopInfo.product[i],
                        available: true,
                    }
                    arr.push(temp);
                }
            }
        }
        setAvailableProduct(arr);
        setClickedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + column - 1, 10, date.getMinutes() + row * 30, date.getSeconds()));
        setReswindow(!reswindow);
    }

    function setComment(res) {
        setStyleWindow(!styleWindow);
        setForStyle(res);
    }
}
export default ReservationTable;