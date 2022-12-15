import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from 'src/app/models/BasketItem';

@Component({
  selector: 'app-shopping-basket-card',
  templateUrl: './shopping-basket-card.component.html',
  styleUrls: ['./shopping-basket-card.component.css']
})
export class ShoppingBasketCardComponent {
  @Input() basketItem: BasketItem;
  @Output() removeEvent: EventEmitter<any> = new EventEmitter()

  removeItemFromBasket() {
    this.removeEvent.emit();
  }
}
