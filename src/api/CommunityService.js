import axios from "axios";
const COMMUNITY_API_BASE_URL = '/api/community'

class CommunityService {
    getAllCommunity(){
        return axios.get(COMMUNITY_API_BASE_URL + "/getAllCommunity")
    }

    getCommunity(id){
        return axios.get(COMMUNITY_API_BASE_URL+"/"+id)
    }

    setCommunity(id, title, content){
        return axios.post(COMMUNITY_API_BASE_URL, {
            id, title, content
        })
    }
    setComment(postId, userId, comment){
        return axios.post(COMMUNITY_API_BASE_URL + "/addComment", {
            postId: postId,
            userId: userId,
            comment: comment,
        });
    }
    getPageInfo(link){
        return axios.get(link);
    }
}

export default new CommunityService();