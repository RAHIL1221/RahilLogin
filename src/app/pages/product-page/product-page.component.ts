import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { Product, ProductService } from '../dashboard/product.service';
import { CommonModule } from '@angular/common';

@Component({
  imports:[CommonModule],
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  errorMessage: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = +this.activeRoute.snapshot.paramMap.get('id')!;//Passed ID
    console.log('Product ID from route:', productId);  // Check if ID is extracted correctly

    this.productService
      .getProduct(productId).subscribe({
        next: (product) => {
          if (product) {
            console.log('Product received:', product); // Check product received
            this.product = product;
          } else {
            console.log('Product not found.');
            this.errorMessage = 'Product not found';
          }
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.errorMessage = 'Error fetching product';
        },
      });
  }
}
