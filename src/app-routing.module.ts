import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizCategorySearchComponent } from './components/quiz-category-search/quiz-category-search.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';

const appRoutes: Routes = [
  {
    path: '/quiz',
    component: QuizCategorySearchComponent,
  },
  {
    path: '/results',
    component: QuizResultsComponent,
  },
  {
    path: '',
    redirectTo: '/quiz',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
