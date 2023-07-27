import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListServiceService } from 'src/app/service/shopping-list-service.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: false }) nameInputRef!: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef!: ElementRef;
  constructor(private ingredientService: ShoppingListServiceService) {}

  onAddItem() {
    console.log('test');

    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientService.addIngredient(newIngredient);
    // console.log(this.ingredientService.getIngredients());
    // setTimeout(() => {
    //   this.ingredientService.getIngredients();
    // }, 1000);
  }
}
