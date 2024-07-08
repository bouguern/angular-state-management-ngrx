import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'p 1', price: 95 },
    { id: 2, name: 'p 2', price: 745 },
    { id: 3, name: 'p 3', price: 58 },
    { id: 4, name: 'p 4', price: 9 },
  ];

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of([...this.products]); // Return a copy of products array
  }

  addProduct(product: Product): Observable<Product[]> {
    this.products = [...this.products, product]; // Add new product to a new array
    return of([...this.products]);
  }

  updateProduct(product: Product): Observable<Product[]> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products = [
        ...this.products.slice(0, index),
        product,
        ...this.products.slice(index + 1)
      ];
      return of([...this.products]);
    } else {
      return throwError('Product not found');
    }
  }

  deleteProduct(productId: number): Observable<Product[]> {
    this.products = this.products.filter(product => product.id !== productId);
    return of([...this.products]);
  }

}
