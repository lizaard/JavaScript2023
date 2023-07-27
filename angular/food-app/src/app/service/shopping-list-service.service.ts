import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListServiceService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private shoppingList: Ingredient[] = [
    new Ingredient('mere', 5),
    new Ingredient('pere', 6),
  ];

  constructor() {}

  getIngredients() {
    return this.shoppingList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingList.push(ingredient);
    this.ingredientsChanged.emit(this.shoppingList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingList.push(...ingredients);
  }
}
