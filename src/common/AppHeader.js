/*eslint-disable*/

import './AppHeader.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileImg } from '../img/icon/profileImg.svg';
import { useSelector } from 'react-redux';
function AppHeader(props) {
    let [menu, menuChange] = useState(false);
    const userInfo = useSelector(state => state.userInfo_reducer);

    let isAuthenticated = userInfo.isAuthenticated;
    let role = userInfo.role;

    return (
        <header className="header">
            <div className="top">
                <h1 className="website-title"><Link to="/">hairshop</Link></h1>
                {isAuthenticated ?
                    <div className="menu" onMouseEnter={() => { menuChange(true) }} onMouseLeave={() => { menuChange(false) }}>
                    <ProfileImg className={menu ? "profileImg active" : "profileImg"} />
                </div>
                : <Link to="/login" className="login-link">로그인을 해주세요</Link>
                }
                
            </div>
            <div>
                <ul className={menu ? 'menu-list active' : 'menu-list'} onMouseEnter={() => { menuChange(true) }} onMouseLeave={() => { menuChange(false) }}>
                    <div>
                        <li className="menu-item">
                        <Link to="/user" className="menu-link">내 정보 관리</Link>
                        </li>
                        <li className="menu-item">
                            {whatRole()}
                        </li>
                        <li className="menu-item">
                            {
                                isAuthenticated ?
                                    <Link to="" className="menu-link" onClick={() => { props.logout() }}>로그아웃</Link>
                                    : <Link to="/login" className="menu-link">로그인</Link>
                            }

                        </li>
                    </div>
                </ul>
            </div>
            <ul className="navbar">
                <li>
                    <Link to="/searchshop" className="nav-item">매장검색</Link>
                </li>
                {/* <li>
                    <Link to="/event" className="nav-item">이벤트</Link>
                </li> */}
                <li>
                    <Link to="/news" className="nav-item">소식</Link>
                </li>
                <li>
                    <Link to="/community" className="nav-item">커뮤니티</Link>
                </li>

            </ul>
        </header>
    )

    function whatRole(){
        if(role === 'ROLE_USER'){
            return <Link to="/reservation" className="menu-link">예약확인/변경</Link>
        } else if(role === 'ROLE_MANAGER'){
            return <Link to="/shopmanager" className="menu-link">매장 관리</Link>
        } else if(role === 'ROLE_ADMIN'){
            return <Link to="/user" className="menu-link">관리자 전용</Link>
        }
    }

}
export default AppHeader;