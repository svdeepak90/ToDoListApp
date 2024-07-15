import { createAction, props } from '@ngrx/store';
import { User } from '../user/user.model';

export const login = createAction('[Auth] Login', props<{ user: User }>());
export const logout = createAction('[Auth] Logout');
export const setUserDetails = createAction('[Auth] Set User Details', props<{ user: User }>());