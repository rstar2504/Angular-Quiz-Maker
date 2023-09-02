import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  QuestionsStructure,
  QuizCategoriesInitialResponse,
  QuizCategoryResponse,
  QuizMode,
  QuizQuestionsAPIResponse,
  QuizSelection,
  totalQuestionsCount,
} from './quiz-data.models';

@Injectable()
export class QuizDataService {
  mode: QuizMode = QuizMode.QUIZ;
  quizQuestions!: Array<QuestionsStructure>;

  baseApiURL = 'https://opentdb.com/';

  constructor(private http: HttpClient) {}

  getQuizCategories(): Observable<QuizCategoriesInitialResponse> {
    return this.http.get<QuizCategoriesInitialResponse>(this.baseApiURL + 'api_category.php');
  }

  fetchQuizCategories(): Observable<QuizCategoryResponse> {
    return this.getQuizCategories().pipe(map(response => response.trivia_categories ? response.trivia_categories : []));
  }

  fetchQuizQuestions(categorySelection: QuizSelection): Observable<QuizQuestionsAPIResponse> {
    const requestData = {
      amount: totalQuestionsCount,
      ...categorySelection,
      type: 'multiple',
    };
    return this.http.get<QuizQuestionsAPIResponse>(this.baseApiURL + 'api.php', {
      params: requestData,
    });
  }

  resetScreen() {
    this.quizQuestions = [];
    this.mode = QuizMode.QUIZ;
  }
}
