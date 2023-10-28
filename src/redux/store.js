import {configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

