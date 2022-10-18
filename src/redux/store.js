import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userRedux from "./userRedux";
import chatRedux from "./chatRedux";
import groupRedux from "./AddToGroup";
import currentProfile from "./currentProfile";


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userRedux,
    chat: chatRedux,
    group: groupRedux,
    profile: currentProfile
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },

        })
})


export let persistor = persistStore(store)