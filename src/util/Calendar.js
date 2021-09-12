import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
registerLocale('ko', ko);
function Calendar(props) {
    const getDayName = (date) => { return date.toLocaleDateString('ko-KR', { weekday: 'long', }).substr(0, 1); }
    const createDate = (date) => { return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)); }

    return (
        <DatePicker
            selected={new Date()}
            onChange={(date) => props.setCheckedDate(date)}
            inline
            locale="ko"
            minDate={new Date()}
            dateFormatCalendar={"yyyy.MM"}
            dayClassName={date => getDayName(createDate(date)) === '토' ? "saturday" : getDayName(createDate(date)) === '일' ? "sunday" : undefined}
        />
    )
}
export default Calendar;