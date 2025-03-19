import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  router: Router;
  imagePreview: string | ArrayBuffer | null = null; // For image preview (base64)
  products: any[] = [];
  selectedProduct: any = null;
  newProduct = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    images: [] as string[]  // Declare images as an array of base64 strings
  };
  accessForm = false;
  accessUForm = false;
  username: string | null = '';
  dob: string | null = '';

  constructor(private productService: ProductService, private _router: Router,private activeRoute: ActivatedRoute) {
    this.router = _router;  // Inject router using constructor
    
  }

  ngOnInit(): void {
    interface User {
      id: number;
      dob?: string;
      username?: string;
    }
    
    const users: User[] = JSON.parse(localStorage.getItem('angular') || '[]');
    const idUser = +this.activeRoute.snapshot.paramMap.get('id')! || 0; // Default to 0 if ID is not found
    
    if (users.length > 0) {
      // Find the user with the given ID
      const user = users.find((u: User) => u.id === idUser);
    
      // If user is found, assign their data; otherwise, assign 'Guest'
      if (user) {
        this.dob = user.dob || 'Guest';
        this.username = user.username || 'Guest';
      } else {
        this.dob = 'Guest';
        this.username = 'Guest';
      }
    } else {
      this.dob = 'Guest';
      this.username = 'Guest';
    }
    
    


    this.fetchProducts();

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const file = input.files[0];
      if (file) {
        if (file.type === 'image/jpeg') {
          this.previewImage(file); 
          this.convertToBase64(file);  
        } else {
          alert('Please upload only JPG images.'); 
        }
      }
    }
  }

  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      // The result will be a base64 encoded string
      if (e.target?.result) {
        this.newProduct.images.push(e.target.result as string);
                console.log('Base64 Image:', e.target.result);        }
    };
    reader.readAsDataURL(file);  
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imagePreview = e.target?.result ?? null;
    };
    reader.readAsDataURL(file); 
  }

  // Fetch all products from the service
  fetchProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products.reverse();
    });
  }

  // Add a new product
  addProduct(): void {
    console.log("Adding new product:", this.newProduct);  
    this.productService.addProduct(this.newProduct).subscribe(data => {
      this.fetchProducts(); 
      this.newProduct = { id: 0, title: '', description: '', price: 0, images: [] };  
    });
  }

  // Edit an existing product
  editProduct(id: number): void {
    this.productService.getProduct(id).subscribe(data => {
      this.selectedProduct = data;
    });
  }

  // Update an existing product
  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        this.fetchProducts(); 
        this.selectedProduct = null; 
      });
    }
  }

  // Delete a product
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();  
    });
  }

}
