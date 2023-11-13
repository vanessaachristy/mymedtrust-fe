// userReducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { setUser, clearUser } from './userAction';

export interface UserState {
    user: { email: string, address: string } | null;
}

export const userInitialState: UserState = {
    user: null,
};

const userReducer = createReducer(userInitialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(clearUser, (state) => {
            state.user = null;
        });
});

export default userReducer;
