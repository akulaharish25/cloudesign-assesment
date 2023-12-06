import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as ItemActions from './app.actions';
import { ItemService } from '../app/services/item.service';

@Injectable()
export class ItemEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map((items) => ItemActions.loadItemsSuccess({ items })),
        )
      )
    )
  );
  constructor(private actions$: Actions, private itemService: ItemService) {}
}
