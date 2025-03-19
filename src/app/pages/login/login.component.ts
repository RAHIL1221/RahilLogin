import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule ,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: any = {
    username: '',
    password: ''
  };
  
  router = inject(Router);
   pass:string ='password'
  seePass(){
    if(this.pass=='password'){
  this.pass='text'
  }
  else{
    this.pass='password'
  }
}
  // This lifecycle hook runs on component initialization
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      // Redirect to the dashboard if the user is already logged in
      this.router.navigateByUrl('dashboard');
     
    }
    
    
  }

  registerRoute() {
    this.router.navigateByUrl('registration');
  }

  onLogin() {
    const isLocalData = localStorage.getItem('angular');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find((m: any) => m.username == this.loginObj.username && m.password == this.loginObj.password);
      

      if (isUserFound != undefined) {
        // If user found, log in and set isLoggedIn to true
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigateByUrl(`dashboard/${isUserFound.id}`);
        console.log()
      } else {
       
        alert('Username and Password are Incorrect');
      }
    } else {
      alert('No User Found');
    }
  }
}
