import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QuizDataService } from './shared/quiz-data.service';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  providers: [QuizDataService],
  templateUrl: './app.component.html',
})
export class App {
  name = 'Angular';
}
