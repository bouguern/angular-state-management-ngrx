import { createReducer, on } from '@ngrx/store';
import { ProductState, initialState, productAdapter } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message || 'Load products failed'
  })),

  on(ProductActions.addProductSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state })
  ),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    error: error.message || 'Add product failed'
  })),

  on(ProductActions.updateProductSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state })
  ),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    error: error.message || 'Update product failed'
  })),

  on(ProductActions.deleteProductSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state })
  ),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error: error.message || 'Delete product failed'
  }))
);

// Export entity selectors from the adapter
export const {
  selectAll,
  selectEntities,
  selectIds,
} = productAdapter.getSelectors();

export const selectLoading = (state: ProductState) => state.loading;
export const selectError = (state: ProductState) => state.error;