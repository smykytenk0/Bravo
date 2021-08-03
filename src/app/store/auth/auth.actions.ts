import { createAction, props } from '@ngrx/store';

const enterEmail = createAction('[Login] Enter email', props<{email: string}>());
const login = createAction('[Login] Login');
const getRole = createAction('[Login] Login', props<{role: number}>());

export const AuthActions = {
  enterEmail,
  login,
  getRole
};
