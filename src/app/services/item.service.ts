import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = [];

  getItems(): Observable<Item[]> {
    return of(this.items);
  }

}
