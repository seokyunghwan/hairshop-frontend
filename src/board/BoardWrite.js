import { useState } from "react";
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router";
import CommunityService from "../api/CommunityService";
import NewsService from "../api/NewsService";

export default function BoardWrite() {
    const userInfo = useSelector(state => state.userInfo_reducer).userInfo;
    const location = useLocation();
    const history = useHistory();
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    return (
        <div>
            <div className="content-body">
                <div className="content-group">
                    <div className="board">
                        <div>
                            <input type="text" className="board-title" placeholder="제목을 입력해주세요" onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <textarea className="board-content" onChange={(e)=>setContent(e.target.value)}></textarea>
                        </div>
                        <div className="board-write-button">
                            <button onClick={uploadPost}>글쓰기</button>
                            <button onClick={uploadCancel}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function uploadPost(){
        if(location.pathname.includes('news')){
            NewsService.setNews(userInfo.id, title, content)
                .then(()=>history.push('/news'))
        } else if(location.pathname.includes('community')){
            CommunityService.setCommunity(userInfo.id, title, content)
                .then(()=>history.push('/community'))

        }
    }
    function uploadCancel(){
        if(location.pathname.includes('news')){
            history.push('/news')
        } else if(location.pathname.includes('community')){
            history.push('/community')
        }
    }
}