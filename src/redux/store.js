import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userInfo_reducer from './reducers/userInfo_reducer';
import shopInfo_reducer from './reducers/shopInfo_reducer';
import { bookmark_reducer } from './reducers/userInfo_reducer';

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ["userInfo_reducer", "shopInfo_reducer"]
};

const rootReducer = combineReducers({
    userInfo_reducer,
    shopInfo_reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(){
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return {store, persistor};
}