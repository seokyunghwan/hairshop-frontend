import BoardList from './BoardList';
import './Board.css';
import { useEffect, useState } from 'react';
import CommunityService from '../api/CommunityService';
export default function Community() {
    let [post, setPost] = useState([]);

    useEffect(()=>{
        CommunityService.getAllCommunity()
            .then((res)=>{
                setPost(res.data)
            })
    },[])
    return (
        <div className="content-body">
            <BoardList post={post} setPost={setPost}/>
        </div>
    )
}