/*eslint-disable*/

import './SearchShop.css';
import { ReactComponent as SearchImg } from '../img/icon/searchImg.svg';
import { useEffect, useState } from 'react';
import ShopService from '../api/ShopService';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SearchShop() {
    let [shopName, setShopName] = useState();
    let [shopPage, setShopPage] = useState();
    let [shopInfo, setShopInfo] = useState([]);
    let [shopPageList, setShopPageList] = useState([]);
    let history = useHistory();
    useEffect(() => {
        if (shopPage) {
            setShopInfo(shopPage._embedded?.shopList);
            var arr = new Array();
            arr = arr.concat(shopPage._links?.pagination)
            setShopPageList(arr);
        }
    }, [shopPage])
    return (
        <div className="content-body search-shop">
            <div className="content-group">
                <div className="search-form">
                    <input type="text" className="search-input" onKeyPress={handleKeyPress} onChange={(e) => { setShopName(e.target.value) }} />
                    <SearchImg className="searchImg" onClick={searchShop} />
                </div>
                <div className="search-result">
                    <table>
                        <colgroup>
                            <col width="200px" />
                            <col width="300px" />
                            <col width="200px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>매장명</th>
                                <th>주소</th>
                                <th>전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shopPage ?
                                    shopInfo?.map(
                                        (info, index) =>
                                            <tr className="shop-lists" key={index} onClick={() => {
                                                history.push({
                                                    pathname: "/searchshop/" + info.id,
                                                    state: {
                                                        link: info._links.self.href
                                                    }
                                                })
                                                // document.location.href=`/searchshop/${info.id}`;
                                            }}>
                                                <td>{info.shopName}</td>
                                                <td>{info.shopAddress}</td>
                                                <td>{info.shopTel}</td>
                                            </tr>
                                    )
                                    : <tr><td colSpan="3" className="none-search">검색 결과가 없습니다</td></tr>
                            }
                        </tbody>
                    </table>
                    <div className="page-nums">{pageNum()}</div>
                </div>
            </div>
        </div>
    )

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            searchShop();
        }
    }

    function searchShop() {
        if (shopName) {
            ShopService.getShopList(shopName)
                .then((res) => {
                    setShopPage(res.data);
                    console.log(res.data)
                });
        }
    }


    function pageNum() {
        if (shopPage) {
            var array = [];
            for (let i = 0; i < shopPage.page?.totalPages; i++) {
                array.push(<button className="page-num" key={i} onClick={getPage} value={i}>{(i + 1)}</button>)
            }
        }
        return array
    }
    function getPage(e) {
        ShopService.getHateoasInfo(shopPageList[e.target.value].href)
            .then((res) => {
                setShopPage(res.data);
            })
    }

}

export default SearchShop;

