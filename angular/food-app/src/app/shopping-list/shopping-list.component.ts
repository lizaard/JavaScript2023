import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListServiceService } from '../service/shopping-list-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;
  constructor(private ingredientService: ShoppingListServiceService) {}

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngredients();
    this.igChangeSub = this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      },
    );
  }
  onEditItem(index: number) {
    this.ingredientService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
