import { Component } from "inferno";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import NotPermissionPage from "./NotPermissionPage";
export default function PrivateRoute({permission, component: Component, ...rest }) {
    const isAuthenticated = useSelector(state => state.userInfo_reducer).isAuthenticated;
    const userRole = useSelector(state => state.userInfo_reducer).role;
    return (
        <Route {...rest} render={props => componentFilter(props)}/>
    )

    function componentFilter(props) {
        var re = isAuthenticated ? (
            permission.includes(userRole)?
            <Component {...props}/>
            :<NotPermissionPage/>
        ) :
            <Redirect
                to={{
                    pathname: '/login',
                }}
            />

        return re;
    }
}
