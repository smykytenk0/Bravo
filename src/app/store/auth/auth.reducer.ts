import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { Auth } from '../interfaces/auth.interface';

export const initialState: Auth = {
  email: '',
  isLoggedIn: false,
  activeRole: 'customer'
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.enterEmail, (state, { email }) => {
    return { ...state, email: email }
  }),
  on(AuthActions.login, (state) => {
    return { ...state, isLoggedIn: true }
  }),
  on(AuthActions.getRole, (state, { role }) => {
    return { ...state, activeRole: role }
  })
);

export const defaultAuthSelector = createFeatureSelector<Auth>('authReducer');
export const emailSelector = createSelector(defaultAuthSelector, state => state.email);
export const loginStatusSelector = createSelector(defaultAuthSelector, state => state.isLoggedIn);
export const roleSelector = createSelector(defaultAuthSelector, state => state.activeRole);
