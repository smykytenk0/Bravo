import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { Auth } from '../interfaces/auth.interface';

export const initialState:Auth = {
  email: ''
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.enterEmail, (state, {email}) => {
    return {...state, email: email}
  })
);

export const defaultAuthSelector = createFeatureSelector<Auth>('authReducer');
export const emailSelector = createSelector(defaultAuthSelector, state => state.email);
