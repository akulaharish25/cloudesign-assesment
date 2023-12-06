import { createAction, props } from '@ngrx/store';
import { Item } from './app.state';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction('[Item] Load Items Success', props<{ items: Item[] }>());
export const addItem = createAction('[Item] Add Item', props<{ item: Item }>());
export const updateItem = createAction('[Item] Update Item', props<{ item: Item }>());
export const deleteItem = createAction('[Item] Delete Item', props<{ itemId: number }>());
