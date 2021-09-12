/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Route, useHistory, Redirect, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Roles from './config/Roles';
//Router Page
import Login from './user/Login.js';

import AppHeader from './common/AppHeader.js';
import AppFooter from './common/AppFooter.js';
import UserService from './api/UserService.js';
import Profile from './user/Profile.js';

import ShopManager from './shop/ShopManager.js';
import ShopService from './api/ShopService.js';
import SearchShop from './shop/SearchShop.js';
import ShopDetail from './shop/ShopDetail.js';
import RegisterShop from './shop/RegisterShop.js';
import Reservation from './reservation/Reservation';

import { setUser } from './redux/reducers/userInfo_reducer';
import { setMyShop } from './redux/reducers/shopInfo_reducer';
import News from './board/News';
import Community from './board/Community';
import Board from './board/Board';
import BoardWrite from './board/BoardWrite';
import Main from './common/Main';
import PrivateRoute from './common/PrivateRoute';

function App() {
  let [token, setToken, removeToken] = useCookies(['loginToken']);
  let [userInfo, setUserInfo] = useState();
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  axios.interceptors.request.use(function (config) {
    if (token.loginToken) {
      config.headers.Authorization = 'Bearer ' + token.loginToken;
    }
    return config;
  });


  useEffect(() => {
    if (token.loginToken) {
      UserService.getCurrentUser()
        .then((res) => {
          const loginInfo = {
            userInfo: res.data,
            role: res.data.authorities[0].authority,
            isAuthenticated: true,
          }
          if (res.data.authorities[0].authority === 'ROLE_MANAGER') {
            ShopService.getShopInfo(res.data.id)
              .then((result) => {
                dispatch(setMyShop(result.data));
              })
          }
          dispatch(setUser(loginInfo));
          setUserInfo(res.data)
          setIsAuthenticated(true)
        })
    }
  }, [token])

  // useEffect(() => {
  //   if (userInfo?.id)
  //     ShopService.getShopInfo(userInfo.id)
  //       .then((res) => {
  //         dispatch(setMyShop(res.data));
  //       })
  // }, []);

  function logout() {
    removeToken('loginToken');
    const loginInfo = {
      userInfo: null,
      role: null,
      isAuthenticated: false,
    }
    // dispatch(setUser(loginInfo))
    localStorage.clear();
    history.push("/");
    window.location.reload()
  }

  return (
    <div className="App">
      <AppHeader logout={logout} />
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Main userInfo={userInfo} isAuthenticated={isAuthenticated}/>
          </Route>
          <Route path="/login">
            {isAuthenticated ?
              <Redirect to="/" />
              : <Login setToken={setToken} />
            }
          </Route>
          <Route exact path="/searchshop">
            <SearchShop />
          </Route>
          <Route path="/searchshop/:id">
            <ShopDetail />
          </Route>
          <Route exact path="/news">
            <News />
          </Route>
          <Route path="/news/:id">
            <Board />
          </Route>
          <Route exact path="/community">
            <Community />
          </Route>
          <Route path="/community/:id">
            <Board />
          </Route>
          <PrivateRoute path="/user" component={Profile} permission={[Roles.MANAGER, Roles.USER]}/>
          <PrivateRoute path="/shopmanager" component={ShopManager} permission={[Roles.MANAGER]} />
          <PrivateRoute path="/registershop" component={RegisterShop} permission={[Roles.MANAGER]} />
          <PrivateRoute path="/reservation" component={Reservation} permission={[Roles.MANAGER, Roles.USER]}/>
          <PrivateRoute path="/newswrite" component={BoardWrite} permission={[Roles.ADMIN]} />
          <PrivateRoute path="/communitywrite" component={BoardWrite} permission={[Roles.ADMIN, Roles.MANAGER, Roles.USER]} />
        </Switch>
      </div>
      <AppFooter className="footer" />
    </div>
  );


}




export default App;
