import { Component,inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 router = inject(Router);
homePage(){
  this.router.navigate(['/dashboard']);
}
 contactPage(){
  this.router.navigate(['/contact']);
 }
  onLogout(){
   
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigateByUrl('login'); // Redirect to login page after logout
     }


  
}
