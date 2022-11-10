import { configureStore } from '@reduxjs/toolkit';
import usuarioSlice from './usuarioSlice';

export const store = configureStore({
    reducer: {
        usuario: usuarioSlice
    }
})