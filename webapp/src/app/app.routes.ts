import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [

    {
        path:"register",
        component:Register
    },
    {
        path:"login",
        component:Login
    }
];
