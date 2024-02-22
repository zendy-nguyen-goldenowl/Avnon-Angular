import { Injectable } from "@angular/core";
import {
  QuestionFormData,
  AnswerData,
} from "../../interfaces/question-form-data.interface";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private localStorageQuestionsKey = "questions";
  private localStorageAnswersKey = "answers";
  private questionsSubject: BehaviorSubject<
    QuestionFormData[]
  > = new BehaviorSubject<QuestionFormData[]>([]);
  private answersSubject: BehaviorSubject<AnswerData[]> = new BehaviorSubject<
    AnswerData[]
  >([]);

  constructor() {
    this.loadQuestions();
    this.loadAnswers();
  }

  private loadQuestions(): void {
    const storedQuestions = localStorage.getItem(this.localStorageQuestionsKey);
    const questions = storedQuestions ? JSON.parse(storedQuestions) : [];
    this.questionsSubject.next(questions);
  }

  addQuestion(question: QuestionFormData): void {
    const storedQuestions = this.questionsSubject.getValue();
    storedQuestions.push(question);
    this.saveQuestions(storedQuestions);
  }

  getQuestions(): Observable<QuestionFormData[]> {
    return this.questionsSubject.asObservable();
  }

  private saveQuestions(questions: QuestionFormData[]): void {
    localStorage.setItem(
      this.localStorageQuestionsKey,
      JSON.stringify(questions)
    );
    this.questionsSubject.next(questions);
  }

  private loadAnswers(): void {
    const storedAnswers = localStorage.getItem(this.localStorageAnswersKey);
    const answers = storedAnswers ? JSON.parse(storedAnswers) : [];
    this.answersSubject.next(answers);
  }

  addAnswer(answer: AnswerData[]): void {
    this.saveAnswers(answer);
  }

  getAnswers(): Observable<AnswerData[]> {
    return this.answersSubject.asObservable();
  }

  private saveAnswers(answers: AnswerData[]): void {
    localStorage.setItem(this.localStorageAnswersKey, JSON.stringify(answers));
    this.answersSubject.next(answers);
  }
}
