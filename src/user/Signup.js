/*eslint-disable*/
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserService from '../api/UserService';
import './Signup.css';

function Signup(props) {
    let [userId, setUserId] = useState();
    let [idCk, setIdCk] = useState(false);
    let [idRes, setIdRes] = useState('');
    let [password, setPassword] = useState();
    let [pwCk, setPwCk] = useState();
    let [pwRes, setPwRes] = useState('');
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [phoneNum, setPhoneNum] = useState();
    let [manager, setManager] = useState(false);

    useEffect(() => {
        if (userId) {
            axios.post('/api/user/idCheck', { userId })
                .then((result) => {
                    {
                        if (result.data === true) {
                            setIdCk(true);
                            setIdRes(<div>사용 가능한 ID입니다</div>);
                        }
                        else {
                            setIdRes(<div className="check-error">이미 사용중인 ID입니다</div>);
                        }
                    }

                })

        }
    }, [userId])

    useEffect(() => {
        if (password && pwCk) {
            password === pwCk
                ? setPwRes()
                : setPwRes(<div className="check-error">비밀번호가 일치하지 않습니다</div>)

        }
    }, [pwCk])

    useEffect(()=>{
        console.log(manager)
    },[manager])
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    회원가입
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={signupHandleSubmit}>
                    <Form.Group controlId="formBasicRole">
                        <Form.Control  className="role-checkbox" type="checkbox" onChange={(e) => { setManager(!manager) }} />
                        <Form.Label>매니저 회원으로 가입 시 체크해주세요</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Id</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Id" onChange={(e) => { setUserId(e.target.value) }} />
                        <Form.Text className="text-muted">
                            {idRes}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password Check</Form.Label>
                        <Form.Control required type="password" placeholder="Password check" onChange={(e) => { setPwCk(e.target.value) }} />
                        <Form.Text className="text-muted">
                            {pwRes}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email address" onChange={(e) => { setEmail(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control required type="text" placeholder="010-0000-0000" onChange={(e) => { setPhoneNum(e.target.value) }} />
                    </Form.Group>
                    <div className="submit-button">
                        <Button variant="primary" type="submit" className="primary-button">
                            회원가입
                        </Button>
                        <Button onClick={props.onHide} className="primary-button">Close</Button>
                    </div>
                </Form>

            </Modal.Body>

        </Modal>

    );

    function signupHandleSubmit(e) {
        e.preventDefault();
        if ((password === pwCk) && idCk) {
            let user = {
                manager, userId, password, name, email, phoneNum
            }
            UserService.createUser(user)
                .then((result) => {
                    alert('회원 가입 성공. 로그인을 진행해주세요')
                    window.location.reload();
                });
        } else {

        }
    }


}

export default Signup;