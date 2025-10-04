import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import userReducer from '../features/userSlice'; // example slice
import userReducer from '../redux/slices/userSlice'

// Combine all reducers
const rootReducer = combineReducers({
    //   user: userReducer,
    user: userReducer
});

// Persist config
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

// Create persistor
export const persistor = persistStore(store);
