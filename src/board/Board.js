import moment from "moment";
import { useRouteMatch, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router"
import NewsService from "../api/NewsService";
import CommunityService from "../api/CommunityService";
import './Board.css';
export default function Board() {
    const userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    let [post, setPost] = useState({});
    let { id } = useParams();
    let [comment, setComment] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('news')) {
            NewsService.getNews(id)
                .then((res) => {
                    setPost(res.data)
                })
        } else if (location.pathname.includes('community')) {
            CommunityService.getCommunity(id)
                .then((res) => {
                    setPost(res.data)
                })
        }
    }, [])

    return (
        <div className="content-body">
            <div className="content-group">
                <div className="content">
                    <div className="post-detail">
                        <div className="post-title-line">
                            <div className="post-title">{post.title}</div>
                            <div className="post-writer">{post.writer?.userId}</div>
                            <div className="post-date">{moment(post.createdTime).format('YYYY.MM.DD HH:mm:ss')}</div>
                        </div>
                        <div className="post-content">{post.content}</div>
                        <div className="comment-line">
                            <div className="comment-list">
                                {post.comments?.map(
                                    (data, i) => <div className="comment">
                                        <div className="comment-writer">{data.writer.userId}</div>
                                        <div className="comment-content">{data.commentCont}</div>
                                        <div className="comment-date">{moment(data.commentTime).format('YYYY.MM.DD HH:mm:ss')}</div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="reg-comment">
                                    <input className="reg-input" onChange={(e) => setComment(e.target.value)}></input>
                                    <button className="reg-ok" onClick={regComment}>등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function regComment() {
        if (location.pathname.includes('news')) {
            NewsService.setComment(id, userInfo.id, comment)
                .then((res) => {
                    setPost(res.data)
                });

        } else if (location.pathname.includes('community')) {
            CommunityService.setComment(id, userInfo.id, comment)
                .then((res) => {
                    setPost(res.data)
                });
        }
    window.location.reload()

    }
}