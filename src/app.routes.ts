import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  {
    path: 'quiz',
    loadComponent: () =>
      import(
        './components/quiz-category-search/quiz-category-search.component'
      ).then((m) => m.QuizCategorySearchComponent),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./components/quiz-results/quiz-results.component').then(
        (m) => m.QuizResultsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
