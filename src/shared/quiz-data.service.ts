import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject } from 'rxjs';
import {
    AppTitle,
  QuestionsStructure,
  QuizCategoryResponse,
  QuizMode,
  QuizSelection,
} from './quiz-data.models';

@Injectable()
export class QuizDataService {
  mode: QuizMode = QuizMode.QUIZ;
  quizQuestions!: Array<QuestionsStructure>;
  
  appResetNotification = new Subject();

  constructor(private http: HttpClient) {}

  fetchQuizCategories(): Observable<QuizCategoryResponse> {
    return this.http
      .get<QuizCategoryResponse>('https://opentdb.com/api_category.php')
      .pipe(
        map(
          (response: any) =>
            (response = response.trivia_categories
              ? response.trivia_categories
              : [])
        )
      );
  }

  fetchQuizQuestions(categorySelection: QuizSelection): Observable<any> {
    const requestData = {
      amount: 5,
      ...categorySelection,
      type: 'multiple',
    };
    return this.http.get('https://opentdb.com/api.php', {
      params: requestData,
    });
  }

  resetApp() {
    this.appResetNotification.next(1);
    this.appResetNotification.complete();
  }

}
