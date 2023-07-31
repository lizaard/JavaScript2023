import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeServiceService } from '../service/recipe-service.service';
import { Recipe } from '../model/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeServiceService,
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<any>(
        'https://lizard-8c61b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes,
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://lizard-8c61b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      )
      .pipe(
        map((recipe) => {
          return recipe.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipe) => {
          this.recipeService.setRecipes(recipe);
        }),
      );
  }
}
