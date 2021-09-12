import axios from "axios";
const NEWS_API_BASE_URL = '/api/news'

class News {
    getAllNews(){
        return axios.get(NEWS_API_BASE_URL + "/getAllNews");
    }

    getNews(id){
        return axios.get(NEWS_API_BASE_URL+"/"+id)
    }

    setNews(id, title, content){
        return axios.post(NEWS_API_BASE_URL, {
            id, title, content
        })
    }

    setComment(postId, userId, comment){
        return axios.post(NEWS_API_BASE_URL + "/addComment", {
            postId: postId,
            userId: userId,
            comment: comment,
        })
    }

    getPageInfo(link){
        return axios.get(link);
    }
}

export default new News();