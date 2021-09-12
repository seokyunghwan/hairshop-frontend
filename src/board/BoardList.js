import { useEffect, useState } from "react"
import moment from "moment"
import './Board.css'
import { useHistory, useLocation } from "react-router"
import NewsService from "../api/NewsService";
import CommunityService from "../api/CommunityService";
import { useSelector } from "react-redux";
export default function BoardList(props) {
    const userRole = useSelector(state=>state.userInfo_reducer).role;
    const history = useHistory();
    const location = useLocation();
    return (
        <div className="content-group">
            <table className="board-table event-table">
                <colgroup>
                    <col width="100px" />
                    <col width="100px" />
                    <col width="*" />
                    <col width="250PX" />
                </colgroup>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {props.post.content?.map(
                        (data, i) =>
                            <tr onClick={() => {
                                history.push({
                                    pathname: location.pathname + '/' + data.id,
                                    state: {
                                        post: data
                                    }
                                })
                            }}>
                                <td>{data.id}</td>
                                <td>{data.writer.userId}</td>
                                <td>{data.title}</td>
                                <td>
                                    {
                                        moment.duration(moment().diff(moment(data.createdTime))).days() === 0 ?
                                            moment(data.createdTime).format('HH:mm:ss')
                                            : moment(data.createdTime).format('YY/MM/DD')
                                    }
                                </td>
                            </tr>
                    )}
                </tbody>
            </table>
            <div className="page-nums">{pageNum()}</div>

            <div className="board-button">
                {setWriteButton()}
            </div>
        </div>
    )

    function pageNum(){
        var array = [];
        for(let i=0 ; i<props.post.totalPages ; i++){
            array.push(<button className="page-num" onClick={getPage} value={i}>{i+1}</button>)
        }
        return array;
    }

    function getPage(e){
        if(location.pathname.includes('news')){
            NewsService.getPageInfo('http://localhost:8083/api/news/getAllNews?page='+e.target.value)
            .then((res)=>{
                props.setPost(res.data)
            })
        } else if(location.pathname.includes('community')){
            CommunityService.getPageInfo('http://localhost:8083/api/community/getAllCommunity?page='+e.target.value)
            .then((res)=>{
                props.setPost(res.data)
            })
        }
    }

    function setWriteButton(){
        if(location.pathname.includes('news')){
            if(userRole == 'ROLE_ADMIN'){
                return <button onClick={() => { history.push(location.pathname + 'write') }}>글쓰기</button>
            } else{
                return null;
            }
        } else if(location.pathname.includes('community')){
            return <button onClick={() => { history.push(location.pathname + 'write') }}>글쓰기</button>
        }
    }
}
