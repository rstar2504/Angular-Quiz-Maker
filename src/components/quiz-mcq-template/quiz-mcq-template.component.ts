import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QuizScoreStripComponent } from '../quiz-score-strip/quiz-score-strip.component';
import { AppTitle, QuestionsStructure, QuizMode } from '../../shared/quiz-data.models';
import { QuizDataService } from '../../shared/quiz-data.service';

@Component({
  selector: 'app-quiz-mcq-template',
  templateUrl: './quiz-mcq-template.component.html',
  styleUrls: ['./quiz-mcq-template.component.scss'],
  standalone: true,
  imports: [CommonModule, QuizScoreStripComponent],
})
export class QuizMcqTemplateComponent implements OnInit {
  @Input() quizQuestions!: Array<QuestionsStructure>;

  QuizModeEnum = QuizMode;
  correctCount: number = 0;

  constructor(protected quizDataService: QuizDataService) {}

  ngOnInit() {}

  setCellColor(
    questionData: QuestionsStructure,
    current_answer: string,
    index: number
  ) {
    switch (this.quizDataService.mode) {
      case QuizMode.QUIZ:
        return questionData.selected_answer === current_answer
          ? 'cell-selected'
          : 'cell-default';
      case QuizMode.RESULTS:
        if (questionData.selected_answer_index === index) {
          return questionData.selected_answer === questionData.correct_answer
            ? 'cell-correct'
            : 'cell-incorrect';
        } else {
          return questionData.correct_answer === current_answer
            ? 'cell-correct'
            : 'cell-default';
        }
      default:
        return 'cell-default';
    }
  }

  quizSubmit() {
    this.quizDataService.mode = QuizMode.RESULTS;
    this.quizDataService.appTitle = AppTitle.RESULTS;
  }

  showSubmitBtn() {
    return (
      this.quizQuestions.length &&
      !this.quizQuestions.find((question) => !question.selected_answer)
    );
  }

  resetScreen() {
    this.quizQuestions = [];
    this.quizDataService.mode = QuizMode.QUIZ;
    this.quizDataService.appTitle = AppTitle.QUIZMAKER;
    this.quizDataService.resetApp();
  }
}
