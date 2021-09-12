import { useHistory } from 'react-router-dom';
import './ShopCard.css';
export default function ShopCard(props){
    const history = useHistory();
    return(
        <div className="shop-card" onClick={()=>{
            history.push("/searchshop/"+props.bookmark.shop.id)
        }}>
            <div className="shop-card-image">
                <img src={props.bookmark.shop.image[0]?.uri}></img>
            </div>
            <div className="card-content card-shop-name">{props.bookmark.shop.shopName}</div>
            <div className="card-content card-shop-comment">
                {props.bookmark.shop.shopInfo}
            </div>
        </div>
    )
}