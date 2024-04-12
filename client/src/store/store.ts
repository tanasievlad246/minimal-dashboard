import { configureStore } from '@reduxjs/toolkit';
import userAuthenticationReducer from '../features/user-authentication';

export const store = configureStore({
  reducer: {
    userAuthentication: userAuthenticationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;