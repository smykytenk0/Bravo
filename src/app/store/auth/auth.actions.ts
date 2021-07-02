import { createAction, props } from '@ngrx/store';

const enterEmail = createAction('[Login] Enter email', props<{email: string}>());

export const AuthActions = {
  enterEmail
};
