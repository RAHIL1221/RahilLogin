import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],  // Make sure the styles file name is correct
  standalone: true
})
export class RegistrationComponent {

  // Include the 'dob' field in the user registration object
  userRegObj: any = {
    id: 1,
    username: '',
    email: '',
    password: '',
    dob: ''  // Add the Date of Birth field here
  };

  // Inject Router for navigation
  router = inject(Router);

  // Method to navigate to the login page
  loginRoute() {
    this.router.navigateByUrl('login');
  }

  // Method to handle form submission and store data in localStorage
  onRegister() {
    const isLocalData = localStorage.getItem("angular");

    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push({...this.userRegObj,id:localArray.length+1});  // Push the new registration object to the array
      localStorage.setItem('angular', JSON.stringify(localArray));  // Save updated array to localStorage
      alert("Registered Successfully");
      this.router.navigateByUrl('login');
    } else {
      const localArray = [];
      localArray.push(this.userRegObj);  // Push the first registration object to an empty array
      localStorage.setItem("angular", JSON.stringify(localArray));  // Save array to localStorage
      alert("Registered Successfully");
      this.router.navigateByUrl('login');
    }
  }
}
