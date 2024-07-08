import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "src/app/models/Product";

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: string | null; 
}

export const productAdapter = createEntityAdapter<Product>();

export const initialState: ProductState = productAdapter.getInitialState({
  //products: [],
  //selectedProductId: null,
  loading: false,
  error: null
});