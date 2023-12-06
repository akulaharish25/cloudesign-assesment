// src/app/app.store.ts
import { ActionReducerMap } from '@ngrx/store';
import * as fromRegistration from './store/registration.state';

export interface AppState {
  registration: fromRegistration.RegistrationState;
}

export const reducers: ActionReducerMap<AppState> = {
  registration: fromRegistration.registrationReducer,
};
