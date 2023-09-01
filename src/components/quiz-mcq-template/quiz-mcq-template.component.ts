import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuestionsStructure, QuizMode } from '../../shared/quiz-data.models';
import { QuizDataService } from '../../shared/quiz-data.service';

@Component({
  selector: 'app-quiz-mcq-template',
  templateUrl: './quiz-mcq-template.component.html',
  styleUrls: ['./quiz-mcq-template.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizMcqTemplateComponent implements OnInit {
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

  setSelectionDetails(
    questionData: QuestionsStructure,
    ans: string,
    index: number
  ) {
    questionData.selected_answer = ans;
    questionData.selected_answer_index = index;
    questionData.isCorrect =
      questionData.selected_answer === questionData.correct_answer;
  }
}
