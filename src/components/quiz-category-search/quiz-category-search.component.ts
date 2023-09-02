import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuizMcqTemplateComponent } from '../quiz-mcq-template/quiz-mcq-template.component';
import {
  AppTitle,
  Difficulties,
  QuestionsStructure,
  QuizCategoryResponse,
  QuizMode,
  QuizQuestionsAPIResponse,
} from '../../shared/quiz-data.models';
import { QuizDataService } from '../../shared/quiz-data.service';

@Component({
  selector: 'app-quiz-category-search',
  templateUrl: './quiz-category-search.component.html',
  styleUrls: ['./quiz-category-search.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuizMcqTemplateComponent],
})
export class QuizCategorySearchComponent implements OnInit {
  loadingCategories: boolean = false;
  loadingAnswers: boolean = false;

  quizCategories!: QuizCategoryResponse;
  quizSearchForm!: FormGroup;

  difficultyLevels: Array<Difficulties> = [
    Difficulties.EASY,
    Difficulties.MED,
    Difficulties.HARD,
  ];

  QuizModeEnum = QuizMode;
  AppTitleEnum = AppTitle;

  appTitle: string = '';

  constructor(
    private router: Router,
    protected quizDataService: QuizDataService
  ) {}

  ngOnInit() {
    this.getQuizCategories();
    this.quizSearchForm = new FormGroup({
      category: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
    });
  }

  getQuizCategories() {
    this.loadingCategories = true;
    this.quizDataService.fetchQuizCategories().subscribe(
      (data: QuizCategoryResponse) => {
        this.quizCategories = data;
        this.loadingCategories = false;
      },
      (error: Error) => {
        this.loadingCategories = false;
        console.log(
          'Could not fetch data! Please try again. Details:',
          error.message
        );
      }
    );
  }

  createQuiz() {
    this.loadingAnswers = true;
    this.quizDataService.mode = QuizMode.QUIZ;
    this.quizDataService
      .fetchQuizQuestions(this.quizSearchForm.value)
      .subscribe(
        (response: QuizQuestionsAPIResponse) => {
          if (response.results && response.results.length) {
            this.quizDataService.quizQuestions = response.results;
            this.formatQuestionsData(response.results);
          }

          this.loadingAnswers = false;
        },
        (error: Error) => {
          this.loadingAnswers = false;
          console.log(
            'Something went wrong! Please try again. Detail:',
            error.message
          );
        }
      );
  }

  shuffle = (array: string[]) => {
    // randomly sort array of answers
    return array.sort(() => Math.random() - 0.5);
  };

  formatQuestionsData(questionsData: Array<QuestionsStructure>) {
    questionsData.forEach((item: QuestionsStructure, index) => {
      const answersArray = [item.correct_answer, ...item.incorrect_answers];
      this.quizDataService.quizQuestions[index].allAnswers =
        this.shuffle(answersArray);
    });
  }

  quizSubmit() {
    this.quizDataService.mode = QuizMode.RESULTS;
    this.router.navigate(['/results']);
  }

  showSubmitBtn() {
    return this.quizDataService.quizQuestions
      ? this.quizDataService.quizQuestions.length &&
          !this.quizDataService.quizQuestions.find(
            (question) => !question.selected_answer
          )
      : false;
  }
}
