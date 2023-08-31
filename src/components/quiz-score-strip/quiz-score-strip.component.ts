import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-score-strip',
  templateUrl: './quiz-score-strip.component.html',
  styleUrls: ['./quiz-score-strip.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizScoreStripComponent implements OnInit {
  correctCount: number = 0;
  @Input() allQuestionsCount: number | undefined = 0;

  finalResultColor: string = '';

  constructor() {}

  ngOnInit() {
    this.correctAnswers();
  }

  correctAnswers() {
    this.correctCount = this.allQuestionsCount
      ? this.allQuestionsCount -
        document.getElementsByClassName('cell-incorrect').length
      : 0;
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
