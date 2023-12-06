import { createReducer, on } from '@ngrx/store';
import * as ItemActions from './app.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  items: [],
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({ ...state, items })),
  on(ItemActions.addItem, (state, { item }) => ({ ...state, items: [...state.items, item] })),
  on(ItemActions.updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.id === item.id ? { ...i, ...item } : i)),
  })),
  on(ItemActions.deleteItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((i) => i.id !== itemId),
  }))
);
