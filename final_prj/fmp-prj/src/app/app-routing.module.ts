import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'meal-plan',
    loadChildren: () => import('./pages/meal-plan/meal-plan.module').then( m => m.MealPlanPageModule)
  },
  {
    path: 'recepy-book',
    loadChildren: () => import('./pages/recepy-book/recepy-book.module').then( m => m.RecepyBookPageModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./pages/shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then( m => m.GroupsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
