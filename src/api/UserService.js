/*eslint-disable*/
import axios from 'axios';

const USER_API_BASE_URL = "/api/user";

class UserService{
    //유저 생성
    createUser(user) {
        console.log(user)
        return axios.post(USER_API_BASE_URL, user);
    }

    //로그인 유저 받아오기
    getCurrentUser(){
        return axios.get(USER_API_BASE_URL + '/me');
    }



    //북마크 저장
    setBookmark(userId, shopId) {
        return axios.post(USER_API_BASE_URL + '/bookmark', null, {
            params: {
                userId: userId,
                shopId: shopId
            }
        });
    }

    //북마크 삭제
    deleteBookmark(userId, shopId){
        return axios.delete(USER_API_BASE_URL + '/bookmark', {
            params: {
                userId: userId,
                shopId: shopId
            }
        });
    }

    //북마크 불러오기
    getAllBookmark(id){
        return axios.get(USER_API_BASE_URL + '/getAllBookmark?id=' + id);
    }
}

export default new UserService();