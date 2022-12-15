import { Injectable, EventEmitter } from '@angular/core';
import { BasketItem } from '../models/BasketItem';
import { Journey } from '../models/Journey';

@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {

  change: EventEmitter<any> = new EventEmitter();

  getItems(): BasketItem[] {
    let itemsKeys = Object.keys(sessionStorage);
    return itemsKeys.map(key => {
      let i = sessionStorage.getItem(key);
      if (i !== null) {
        return JSON.parse(i);
      }
    })
  }

  getItemsCount(): number {
    let itemsKeys = Object.keys(sessionStorage);
    let counts = itemsKeys.map(key => {
      let i = sessionStorage.getItem(key);
      if (i !== null) {
        let item: BasketItem = JSON.parse(i);
        return item.count;
      }
      return 0;
    })
    return counts.reduce((x, y) => {return x + y}, 0);
  }

  getItemsTotalCost(): number {
    let itemsKeys = Object.keys(sessionStorage);
    let counts = itemsKeys.map(key => {
      let i = sessionStorage.getItem(key);
      if (i !== null) {
        let item: BasketItem = JSON.parse(i);
        return item.count * item.costPerUnit;
      }
      return 0;
    })
    return counts.reduce((x, y) => {return x + y}, 0);
  }

  addItem(journey: Journey) {
    let item = sessionStorage.getItem(`${journey._id}`);
    if (item !== undefined && item !== null) {
      let i: BasketItem = JSON.parse(item);
      i.count++;
      sessionStorage.setItem(`${journey._id}`, JSON.stringify(i));
    } else {
      sessionStorage.setItem(
        `${journey._id}`,
        JSON.stringify(this.mapToBasketItem(journey))
      );
    }
    this.changeDetected();
  }

  reduceItems(id: string) {
    let item = sessionStorage.getItem(`${id}`);
    if (item !== undefined && item !== null) {
      let i: BasketItem = JSON.parse(item);
      if (i.count > 1) {
        i.count--;
        sessionStorage.setItem(`${id}`, JSON.stringify(i));
      } else {
        sessionStorage.removeItem(`${id}`);
      }
    }
    this.changeDetected();
  }

  removeItemsOfGivenId(id: string) {
    sessionStorage.removeItem(`${id}`);
  }

  removeItems() {
    sessionStorage.clear();
    this.change.emit();
  }

  itemsInBasket(id: string) {
    let item = sessionStorage.getItem(`${id}`);
    if (item !== undefined && item !== null) {
      let i: BasketItem = JSON.parse(item);
      return i.count;
    }
    return 0;
  }

  canRemove(id: string): boolean {
    let item = sessionStorage.getItem(`${id}`);
    if (item === undefined || item === null) {
      return false;
    }
    return true;
  }

  private changeDetected() {
    this.change.emit();
  }

  private mapToBasketItem(j: Journey): BasketItem {
    let item = new BasketItem();

    item.journeyId = j._id;
    item.name = j.name;
    item.costPerUnit = j.cost;
    item.count = 1;
    item.startDate = j.startDate;
    item.endDate = j.endDate;
    item.isActive = true;
    return item;
  }
}
