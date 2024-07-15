import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any;
}

export const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, state => ({ ...state, user: null })),
  on(AuthActions.setUserDetails, (state, { user }) => ({ ...state, user }))
);