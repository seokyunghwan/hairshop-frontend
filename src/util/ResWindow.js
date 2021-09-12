/*eslint-disable*/
import moment from 'moment';
import 'moment/locale/ko';
import './ResWindow.css';
import Select from 'react-select';
import { useCallback, useEffect, useState } from 'react';
import ReservationService from '../api/ReservationService';
import { useSelector } from 'react-redux';
export default function ResWindow(props) {

    let userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    let options = [];
    let [selectedService, setSelectedSerivce] = useState('');

    console.log(props.availableProduct);
    const selService = useCallback((inputValue) => {
        for (let i = 0; i < props.shopInfo.product.length; i++) {
            if (props.shopInfo.product[i].serviceName === inputValue.value) {
                setSelectedSerivce(props.shopInfo.product[i]);
            }
        }
    }
        , []);
    for (let i = 0; i < props.availableProduct.length; i++) {
        if (props.availableProduct[i].available) {
            options.push({
                value: props.availableProduct[i].serviceName,
                label: props.availableProduct[i].serviceName,
                isDisabled: false
            })
        } else {
            options.push({
                value: props.availableProduct[i].serviceName,
                label: props.availableProduct[i].serviceName,
                isDisabled: true
            })
        }
    }
    const customStyles = {

    }
    return (
        // <div className="popup" onClick={() => { props.setReswindow(false) }}>
        <div className="popup" >
            <div className="res-modal">
                <div className="res-date">
                    <div>
                        {moment(props.clickedDate).format('MM월 DD일 dddd')}
                    </div>
                    <div>
                        {moment(props.clickedDate).format('HH시 mm분')}
                    </div>
                </div>
                <div className="sel-service">
                    <Select
                        className="select"
                        name="service"
                        styles={customStyles}
                        width='200px'
                        options={options}
                        placeholder="시술을 선택해주세요"
                        onChange={selService}
                        isSearchable={false}
                    />
                    <div className="sel-service-info">
                        {selectedService.productInfo}
                    </div>
                </div>
                <div className="sel-price">
                    {selectedService ?
                        <>{numberWithCommas(selectedService.price)} 원</>
                        : null
                    }
                </div>
                <div className="sel-ok">
                    <button onClick={setReservation} className="confirm-button">확인</button>
                    <button onClick={() => { props.setReswindow(false); props.setAvailableProduct([]) }} className="res-button">취소</button>
                </div>
            </div>
        </div>
    )

    function numberWithCommas(x) {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function setReservation() {
        console.log(props.clickedDate)
        if (selectedService) {
            let current = new Date(props.clickedDate);
            var h = parseInt(selectedService.requiredTime.substr(0, 2));
            var m = parseInt(selectedService.requiredTime.substr(2, 2));
            let endDate = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours() + h, current.getMinutes() + m);
            console.log(endDate)
            let reservationDto = {
                user: userInfo.id,
                shop: props.shopInfo.id,
                startDate: props.clickedDate,
                endDate: endDate,
                serviceName: selectedService.serviceName,
                price: selectedService.price
            }
            ReservationService.setReservation(reservationDto)
                .then((res) => {
                    props.setReswindow(false)
                    location.reload();
                    // ReservationService.getReservationList(props.clickedDate, props.shopInfo.id)   
                });
        }
    }
}