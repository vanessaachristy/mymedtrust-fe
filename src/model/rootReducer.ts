// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers if needed
});

export type RootState = ReturnType<typeof rootReducer>;



export default rootReducer;
