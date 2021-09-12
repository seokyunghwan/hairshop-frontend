/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Signup from './Signup.js';
import { loginUser } from '../api/LoginService';
import './Login.css';

function Login(props) {
    let [id, setId] = useState('');
    let [password, setPassword] = useState('');
    const loginDto = {
        id,
        password
    }

    const [modalShow, setModalShow] = useState(false);
    let history = useHistory();

    
    return (
        <div className="login-frame">
            <Form onSubmit={loginHandleSubmit} className="login-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="ID" onChange={(e) => { setId(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <div className="submit-button">
                    <Button className="link-button" variant="link" onClick={() => setModalShow(true)}>
                        회원가입
                    </Button>
                    <Button className="primary-button" type="submit">
                        로그인
                    </Button>

                </div>
            </Form>

            <Signup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
    async function loginHandleSubmit(event) {
        event.preventDefault();
        const response = await loginUser(loginDto);
        props.setToken('loginToken', response.data.token);
        history.push("/");
    }
}
export default Login;