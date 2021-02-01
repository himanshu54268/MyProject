import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../app/products/products.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([{ path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
