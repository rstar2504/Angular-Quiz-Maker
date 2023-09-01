import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizDataService } from './shared/quiz-data.service';
import { QuizCategorySearchComponent } from './components/quiz-category-search/quiz-category-search.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    QuizCategorySearchComponent,
  ],
  providers: [QuizDataService],
  templateUrl: './app.component.html',
})
export class App {
  name = 'Angular';
}
