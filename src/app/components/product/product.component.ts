import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';

import * as ProductSelectors from 'src/app/state/product/product.selectors';
import * as ProductActions  from 'src/app/state/product/product.actions';
import { ProductState } from 'src/app/state/product/product.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  product: Product = { id: 0, name: '', price: 0 };

  constructor(private store: Store<ProductState>) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectLoading);
    this.error$ = this.store.select(ProductSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onSubmit(): void {
    if (this.product.id === 0) {
      const newProduct: Product = { ...this.product, id: Date.now() };
      this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
    } else {
      this.store.dispatch(ProductActions.updateProduct({ product: this.product }));
    }
    this.resetForm();
  }

  selectProduct(productId: number): void {
    this.products$.subscribe(products => {
      const selectedProduct = products.find(p => p.id === productId);
      if (selectedProduct) {
        this.product = { ...selectedProduct };
      }
    });
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(ProductActions.deleteProduct({ productId }));
  }

  resetForm(): void {
    this.product = { id: 0, name: '', price: 0 };
  }

}
