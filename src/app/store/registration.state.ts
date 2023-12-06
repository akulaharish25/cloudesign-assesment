// src/app/store/registration.state.ts
import { createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';

export interface RegistrationState {
    formData: any; 
  }
  
  export const initialState: RegistrationState = {
    formData: null,
  };
  
  export const setFormData = createAction(
    '[Registration] Set Form Data',
    props<{ formData: any }>() 
  );
  
  export const registrationReducer = createReducer(
    initialState,
    on(setFormData, (state, { formData }) => ({ ...state, formData }))
  );