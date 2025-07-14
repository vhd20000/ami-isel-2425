import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepyBookPage } from './recepy-book.page';

const routes: Routes = [
  {
    path: '',
    component: RecepyBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepyBookPageRoutingModule {}
