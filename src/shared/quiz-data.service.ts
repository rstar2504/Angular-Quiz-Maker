import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  QuestionsStructure,
  QuizCategoryResponse,
  QuizMode,
  QuizSelection,
} from './quiz-data.models';

@Injectable()
export class QuizDataService {
  mode: QuizMode = QuizMode.QUIZ;
  quizQuestions!: Array<QuestionsStructure>;

  baseApiURL = 'https://opentdb.com/';

  constructor(private http: HttpClient) {}

  fetchQuizCategories(): Observable<QuizCategoryResponse> {
    return this.http
      .get<QuizCategoryResponse>(this.baseApiURL + 'api_category.php')
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
    return this.http.get(this.baseApiURL + 'api.php', {
      params: requestData,
    });
  }
}
