import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffect {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() =>
      this.httpClient.get<Recipe[]>(
        'https://udemy-angular-7.firebaseio.com/recipes.json',
        { observe: 'body', responseType: 'json' }
      )
    ),
    map((recipes: Recipe[]) => {
      for (const recipe of recipes) {
        if (!recipe.ingredients) {
          recipe.ingredients = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({ dispatch: false })
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const request = new HttpRequest(
        'PUT',
        'https://udemy-angular-7.firebaseio.com/recipes.json',
        state.recipes,
        {
          reportProgress: true
        }
      );
      return this.httpClient.request(request);
    })
  );

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<fromRecipe.RecipeState>
  ) {}
}
