import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

import { selectAll } from './product.reducer';

// Select the feature state 
export const selectProductState = createFeatureSelector<ProductState>('products');

// Selectors for product entities
export const selectAllProducts = createSelector(
  selectProductState,
  selectAll
);

export const selectProductEntities = createSelector(
  selectProductState,
  selectAll,
  (state, products) => products
);

export const selectProductIds = createSelector(
  selectProductState,
  selectAll,
  (state, products) => products
);

export const selectProductById = (productId: number) => createSelector(
  selectProductEntities,
  entities => entities[productId]
);

// Selectors for loading and error state
export const selectLoading = createSelector(
  selectProductState,
  state => state.loading
);

export const selectError = createSelector(
  selectProductState,
  state => state.error
);