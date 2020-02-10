import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { ListGuiasComponent } from './components/admin/list-guias/list-guias.component';
import { DetallesGuiasComponent } from './components//detalles-guias/detalles-guias.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';


const routes: Routes = [
 {path: '', component: HomeComponent },
 { path: 'guia/:id', component: DetallesGuiasComponent },

 { path: 'admin/list-guias', component: ListGuiasComponent, canActivate: [AuthGuard] },
 { path: 'user/login', component: LoginComponent },
 { path: 'user/register', component: RegisterComponent },
 { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
 { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
