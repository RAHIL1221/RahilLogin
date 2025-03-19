import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

// Define the Product interface for better type safety
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 4,
      title: 'Red Lipstick',
      description:
        'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
      price: 12.99,
      images: [
        'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png',
      ],
    },
    
    {
      id: 3,
      title: 'Powder Canister',
      description:
        'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
      price: 14.99,
      images: [
        'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
      ],
    },
    {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      description:
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      price: 9.99,
      images: [
        'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      ],
    },
    
    {
      id: 5,
      title: 'Red Nail Polish',
      description:
        'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
      price: 8.99,
      images: [
        'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png',
      ],
    },{
      id: 2,
      title: 'Eyeshadow Palette with Mirror',
      description:
        'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it\'s convenient for on-the-go makeup application.',
      price: 19.99,
      images: [
        'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png',
      ],
    },
  ];

  constructor() {}

  // Return all products
  getProducts(): Observable<{ products: Product[] }> {
    return of({ products: this.products });
  }

  // Get a product by ID
  getProduct(id: number): Observable<Product | null> {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      console.log('Product found:', product); // Debugging log
      return of(product); // Return the product wrapped in an Observable
    } else {
      console.error(`Product with id ${id} not found`); // More descriptive error
      return throwError(() => new Error(`Product with id ${id} not found`)); // Return error if product not found
    }
  }
  // Add a new product
  addProduct(product: Product): Observable<Product> {
    const newProduct = { ...product, id: this.products.length + 1 }; // Automatically generate ID
    this.products = [...this.products, newProduct]; // Create a new array to avoid mutation
    return of(newProduct);
  }

  // Update an existing product
  updateProduct(id: number, product: Product): Observable<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return of(this.products[index]);
    } else {
      return throwError(() => new Error('Product not found'));
    }
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      const deletedProduct = this.products[index];
      this.products = this.products.filter((p) => p.id !== id); // Avoid mutation, create a new array
      return of(deletedProduct);
    } else {
      return throwError(() => new Error('Product not found'));
    }
  }
}
