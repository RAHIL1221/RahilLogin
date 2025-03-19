import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
    },
    {
        path:'login',
        component:LoginComponent
    },    {
        path:'registration',
        component:RegistrationComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard/:id',
                component:DashboardComponent
            },
            {
                path:'contact',
                component:ContactComponent
            },
            {
                component:ProductPageComponent,
                path:'product/:id'
            }
        ]
    },
];
