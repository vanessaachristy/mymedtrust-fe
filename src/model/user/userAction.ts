// userActions.ts
import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction<{ email: string, address: string }>('user/setUser');
export const clearUser = createAction('user/clearUser');
