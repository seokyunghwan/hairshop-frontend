const SET_MY_SHOP_INFO = "shopinfo_reducer/SET_MY_SHOP_INFO";

export function setMyShop(payload){
    return { type : SET_MY_SHOP_INFO, payload }
}

const initialState = {
    shopInfo : null,
}

export default function shopInfo_reducer(state = initialState, action){
    switch(action.type){
        case SET_MY_SHOP_INFO :
            return {
                ...state,
                shopInfo: action.payload,
            };
        default:
            return state;
    }
}