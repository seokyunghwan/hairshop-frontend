const SET_USER = "userinfo_reducer/SET_USER";
const DELETE_USER = "userinfo_reducer/DELETE_USER";
// export const setUser = payload => ({ type : 'SET_USER', payload });


export function setUser(payload) {
    return { type: SET_USER, payload }
}

export function deleteUser() {
    return { type: DELETE_USER }
}

const initialState = {
    userInfo: null,
    role: null,
    isAuthenticated: false,
};


export default function userInfo_reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                userInfo: action.payload.userInfo,
                role: action.payload.role,
                isAuthenticated: action.payload.isAuthenticated,
            };

        default:
            return state;
    }
}
