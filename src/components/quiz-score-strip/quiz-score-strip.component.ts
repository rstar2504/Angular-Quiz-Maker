import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QuizDataService } from '../../shared/quiz-data.service';

@Component({
  selector: 'app-quiz-score-strip',
  templateUrl: './quiz-score-strip.component.html',
  styleUrls: ['./quiz-score-strip.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizScoreStripComponent implements OnInit {
  correctCount: number = 0;
  totalQuestions: number = 0;

  finalResultColor: string = '';

  constructor(private quizDataService: QuizDataService) {}

  ngOnInit() {
    this.correctAnswers();
  }

  correctAnswers() {
    this.totalQuestions =
      this.quizDataService.quizQuestions &&
      this.quizDataService.quizQuestions.length
        ? this.quizDataService.quizQuestions.length
        : 0;

    this.correctCount = this.quizDataService.quizQuestions.filter(
      (item) => item.isCorrect
    ).length;
    this.finalResultColor = this.finalResult(this.correctCount);
  }

  finalResult(count: number) {
    switch (count) {
      case 0:
      case 1:
        return 'fail';

      case 2:
      case 3:
        return 'average';

      case 4:
      case 5:
        return 'pass';

      default:
        return '';
    }
  }
}
