import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product.service';

@Injectable() 
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getAllProducts().pipe(
      map(products => ProductActions.loadProductsSuccess({ products })),
      catchError(error => of(ProductActions.loadProductsFailure({ error })))
    ))
  ));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.addProduct),
    mergeMap(action => this.productService.addProduct(action.product).pipe(
      map(products => ProductActions.addProductSuccess({ products })),
      catchError(error => of(ProductActions.addProductFailure({ error })))
    ))
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    mergeMap(action => this.productService.updateProduct(action.product).pipe(
      map(products => ProductActions.updateProductSuccess({ products })),
      catchError(error => of(ProductActions.updateProductFailure({ error })))
    ))
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.deleteProduct),
    mergeMap(action => this.productService.deleteProduct(action.productId).pipe(
      map(products => ProductActions.deleteProductSuccess({ products })),
      catchError(error => of(ProductActions.deleteProductFailure({ error })))
    ))
  ));
}