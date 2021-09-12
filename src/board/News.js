import BoardList from './BoardList';
import './Board.css';
import { useEffect, useState } from 'react';
import NewsService from '../api/NewsService';
export default function News() {
    let [post, setPost] = useState([]);

    useEffect(()=>{
        NewsService.getAllNews()
            .then((res)=>{
                setPost(res.data)
            })
    },[])
    return (
        <div className="content-body">
            <div></div>
            <BoardList post={post} setPost={setPost}/>
        </div>
    )
}