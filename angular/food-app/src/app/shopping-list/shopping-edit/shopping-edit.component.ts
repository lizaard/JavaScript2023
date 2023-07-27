import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListServiceService } from 'src/app/service/shopping-list-service.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  constructor(private ingredientService: ShoppingListServiceService) {}
  ngOnInit(): void {
    this.subscription = this.ingredientService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.ingredientService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      },
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.ingredientService.updateIngredient(
        this.editedItemIndex,
        newIngredient,
      );
      this.slForm.reset();
      this.editMode = false;
    } else {
      this.ingredientService.addIngredient(newIngredient);
      this.slForm.reset();
    }
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  deleteItems() {
    this.ingredientService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }
}
