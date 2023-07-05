import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDatepickerComponent } from './product-datepicker/product-datepicker.component';

const routes: Routes = [
  {path:'', component:ProductDatepickerComponent},
  {path:'product-list/:date', component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
