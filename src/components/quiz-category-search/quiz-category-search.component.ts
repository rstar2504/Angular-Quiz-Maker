import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuizMcqTemplateComponent } from '../quiz-mcq-template/quiz-mcq-template.component';
import {
  Difficulties,
  QuestionsStructure,
  QuizCategoryResponse,
  QuizMode,
} from '../../shared/quiz-data.models';
import { QuizDataService } from '../../shared/quiz-data.service';

@Component({
  selector: 'app-quiz-category-search',
  templateUrl: './quiz-category-search.component.html',
  styleUrls: ['./quiz-category-search.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuizMcqTemplateComponent],
})
export class QuizCategorySearchComponent implements OnInit, OnDestroy {
  loadingCategories = false;
  loadingAnswers = false;

  quizCategories!: QuizCategoryResponse;
  quizSearchForm!: FormGroup;
  quizQuestions!: Array<QuestionsStructure>;

  difficultyLevels = [Difficulties.EASY, Difficulties.MED, Difficulties.HARD];

  QuizModeEnum = QuizMode;

  appTitle: string = '';
  resetNotifier: any;

  constructor(protected quizDataService: QuizDataService) {}

  ngOnInit() {
    this.getQuizCategories();
    this.quizSearchForm = new FormGroup({
      category: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
    });

    this.resetNotifier = this.quizDataService.appResetNotification.subscribe(
      (result) => {
        this.quizSearchForm.setValue({ category: '', difficulty: '' });
      }
    );
  }

  getQuizCategories() {
    this.loadingCategories = true;
    this.quizDataService.fetchQuizCategories().subscribe(
      (data: QuizCategoryResponse) => {
        this.quizCategories = data;
        this.loadingCategories = false;
      },
      (error) => {
        this.loadingCategories = false;
        console.log('Could not fetch data!');
      }
    );
  }

  onSubmit() {
    this.loadingAnswers = true;
    console.log(this.quizSearchForm.value);
    this.quizDataService
      .fetchQuizQuestions(this.quizSearchForm.value)
      .subscribe((response) => {
        console.log('Quiz questions: ', response);

        this.quizQuestions = response.results;
        this.formatQuestionsData(response.results);
        this.loadingAnswers = false;
        this.quizDataService.mode = QuizMode.QUIZ;
      });
  }

  shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  formatQuestionsData(questionsData: Array<QuestionsStructure>) {
    questionsData.forEach((item: QuestionsStructure, index) => {
      const answersArray = [item.correct_answer, ...item.incorrect_answers];
      this.quizQuestions[index].allAnswers = this.shuffle(answersArray);
    });
  }

  ngOnDestroy() {
    this.resetNotifier.unsubscribe();
  }
}