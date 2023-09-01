import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../shared/quiz-data.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    private quizDataService: QuizDataService
  ) {}

  ngOnInit() {
    this.quizDataService.resetScreen();
  }

  goToHome() {
    this.router.navigate(['quiz']);
  }
}
