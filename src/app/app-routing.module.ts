import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'add-expense',
    component: AddExpenseComponent
  },
  {
    path: 'add-expense/:id',
    component: AddExpenseComponent
  },
  {
    path: 'add-category',
    component: CategoryComponent
  },
  {
    path: 'add-category/:id',
    component: CategoryComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
