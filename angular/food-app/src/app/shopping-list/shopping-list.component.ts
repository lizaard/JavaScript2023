import { Component } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListServiceService } from '../service/shopping-list-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  ingredients!: Ingredient[];
  constructor(private ingredientService: ShoppingListServiceService) {
    this.ingredients = this.ingredientService.getIngredients();
    this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }
}
