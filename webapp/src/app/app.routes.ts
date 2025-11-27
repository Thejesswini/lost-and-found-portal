import { Routes } from '@angular/router';
import { Register } from './components/register/register.component';
import { Login } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { Home } from './components/home/home.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { DeleteItemComponent } from './components/delete-items/delete-items.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [

    {
        path:"register",
        component:Register
    },
    {
        path:"login",
        component:Login
    },

    {
        path:"",
        component:Home,
        canActivate:[authGuard]
    },

    {
        path:"add-item",
        component:AddItemComponent,
        canActivate:[authGuard]
    },
    {
        path:"view-item",
        component:ViewItemsComponent,
        canActivate:[authGuard]
    },
    {
        path:"update-item",
        component:UpdateItemComponent,
        canActivate:[authGuard]
    },
    {
        path:"delete-item",
        component:DeleteItemComponent,
        canActivate:[authGuard]
    },

    {
        path:"user-profile",
        component:UserProfileComponent,
        canActivate:[authGuard]
    },

    {
        path:"item/:id",
        loadComponent: () =>
            import('./components/item-details/item-details')
            .then(m => m.ItemDetailsComponent),
        canActivate:[authGuard]
    }
];
