import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {
  AnswerData,
  QuestionFormData,
} from "../interfaces/question-form-data.interface";
import { FormService } from "../services/form/form.service";
import { ModalService } from "../services/modal/modal.service";

@Component({
  selector: "angular-avnon-builder",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: "./builder.component.html",
  styleUrls: ["./builder.component.css"],
})
export class BuilderComponent {
  questions$: Observable<QuestionFormData[]> = new Observable<
    QuestionFormData[]
  >();
  paragraphAnswers: string[] = [];
  checkboxAnswers: boolean[][] = [];

  answersSignal = signal<Record<number, string[]>>([]);

  constructor(
    private router: Router,
    private modalService: ModalService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.questions$ = this.formService.getQuestions();
    console.log(`this.questions$`, this.questions$);
    this.questions$.subscribe((questions) => {
      this.paragraphAnswers = new Array(questions.length).fill("");
      this.checkboxAnswers = new Array(questions.length).fill([]).map(() => []);
    });
  }

  addQuestionModal(): void {
    this.modalService.addQuestionModal();
  }

  reviewAnswers(): void {
    const answers: AnswerData[] = [];
    this.questions$.subscribe((questions) => {
      questions.forEach((question, index) => {
        if (question.answerType === "paragraph") {
          answers.push({
            type: "paragraph",
            question: question.question,
            paragraphAnswer: this.paragraphAnswers[index],
            checkboxAnswer: [],
          });
        } else if (question.answerType === "checkbox") {
          const checkboxAnswers: string[] = [];
          question.answerOptions.forEach((option, optionIndex) => {
            if (this.checkboxAnswers[index][optionIndex]) {
              checkboxAnswers.push(option);
            }
          });
          answers.push({
            type: "checkbox",
            question: question.question,
            paragraphAnswer: "",
            checkboxAnswer: checkboxAnswers,
          });
        }
      });
    });

    this.formService.addAnswer(answers);
    this.router.navigate(["form/answers"]);
  }
}
