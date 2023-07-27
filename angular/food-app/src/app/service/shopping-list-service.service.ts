import { Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListServiceService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private shoppingList: Ingredient[] = [
    new Ingredient('mere', 5),
    new Ingredient('pere', 6),
  ];

  getIngredient(index: number) {
    return this.shoppingList[index];
  }

  getIngredients() {
    return this.shoppingList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingList.push(ingredient);
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingList.push(...ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.shoppingList[index] = newIngredient;
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  deleteIngredient(index: number) {
    this.shoppingList.splice(index, 1);
    this.ingredientsChanged.next(this.shoppingList.slice());
  }
}
