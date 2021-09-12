/*eslint-disable*/
import axios from 'axios';

const SHOP_API_BASE_URL = "/api/shop";

class ShopService {
    getShopList(shopName) {
        return axios.get(SHOP_API_BASE_URL + '?shopName=' + shopName);
    }

    getHateoasInfo(link) {
        return axios.get(link);
    }

    getShopInfo(id) {
        return axios.get(SHOP_API_BASE_URL + "/" + id);
    }

    // getMyShop(userId) {
    //     return axios.get(SHOP_API_BASE_URL + "/myshop/" + userId);
    // }
    registerShop(formData) {
        return axios.post(SHOP_API_BASE_URL, formData);
    }
    
}

export default new ShopService();