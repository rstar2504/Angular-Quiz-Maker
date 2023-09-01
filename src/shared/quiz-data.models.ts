export type QuizCategory = {id: number, name: 'string'};

export type QuizCategoryResponse = Array<QuizCategory>;

export type QuizSelection = {category: number, difficulty: string};

export type QuestionsStructure = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: Array<string>,
  question: string,
  type: string,
  allAnswers?: Array<string>,
  selected_answer?: string,
  selected_answer_index?: number,
  isCorrect?: boolean
}

export enum Difficulties {
  'EASY' = 'easy',
  'MED' = 'medium',
  'HARD' = 'hard'
}

export enum QuizMode {
  'QUIZ',
  'RESULTS'
}

export enum CellColors {
  'SELECTED' = 'lightblue',
  'CORRECT' = 'green',
  'INCORRECT' = 'red'
}

export enum AppTitle {
  'QUIZMAKER' = 'Quiz Maker',
  'RESULTS' = 'RESULTS'
}

export const totalQuestionsCount = 5;