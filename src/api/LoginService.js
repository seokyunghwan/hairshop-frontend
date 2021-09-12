import axios from 'axios';

const LOGIN_API_BASE_URL = "/api/authenticate"

export function loginUser(loginDto) {
    return axios.post(LOGIN_API_BASE_URL, loginDto)
}
