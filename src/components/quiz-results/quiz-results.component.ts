import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../../shared/quiz-data.service';
import { AppTitle, QuizMode } from '../../shared/quiz-data.models';
import { QuizMcqTemplateComponent } from '../quiz-mcq-template/quiz-mcq-template.component';
import { QuizScoreStripComponent } from '../quiz-score-strip/quiz-score-strip.component';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
  standalone: true,
  imports: [CommonModule, QuizMcqTemplateComponent, QuizScoreStripComponent],
})
export class QuizResultsComponent implements OnInit {
  AppTitleEnum = AppTitle;

  constructor(protected quizDataService: QuizDataService) {}

  ngOnInit() {}

  resetScreen() {
    this.quizDataService.quizQuestions = [];
    this.quizDataService.mode = QuizMode.QUIZ;
    this.quizDataService.resetApp();
  }
}
