/*eslint-disable*/
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import './ShopManager.css';
import { useHistory } from 'react-router-dom';
import ResCalendar from '../util/ResCalendar';
function ShopManager() {
    let history = useHistory();
    let [ownerCheck, setOwnerCheck] = useState(false);
    let shopInfo = useSelector(state => state.shopInfo_reducer).shopInfo;
    let userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    console.log(shopInfo)
    useEffect(() => {
        if (!shopInfo) {
            if (window?.confirm('등록된 매장이 없습니다. 매장 등록 화면으로 이동하시겠습니까?')) {
                history.push("/registershop");
            } else {
                history.push("/");
            }
        }
        console.log('hi')
    }, [])

    useEffect(()=>{
        if(userInfo?.id === shopInfo?.owner.id){
            setOwnerCheck(true);
        }
    },[userInfo, shopInfo])
    return (
        <>
            <ResCalendar shopInfo={shopInfo} ownerCheck={ownerCheck}/>
            <div className="content-group">
                <div className="content-title">
                    <h4>매장 정보 수정</h4>
                </div>
            </div>
        </>
    )
}




export default ShopManager;