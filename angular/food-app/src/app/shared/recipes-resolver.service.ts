import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { DataStorageService } from './data-storage.service';
import { Observable } from 'rxjs';
import { RecipeServiceService } from '../service/recipe-service.service';

export const RecipesResolverService: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  recipes: RecipeServiceService = inject(RecipeServiceService),
  dataService: DataStorageService = inject(DataStorageService),
): Observable<Recipe[]> => {
  const recipe = recipes.getRecipes();
  if (recipe.length === 0) {
    return dataService.fetchRecipes();
  } 
  return null
};
