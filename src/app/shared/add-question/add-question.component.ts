import { Component, signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormService } from "src/app/services/form/form.service";
import { ANSWER_TYPES } from "src/app/constants/answer-types.constant";
import { QuestionFormData } from "src/app/interfaces/question-form-data.interface";

@Component({
  selector: "angular-avnon-add-question",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.css"],
})
export class AddQuestionComponent {
  answerTypes = ANSWER_TYPES;

  questionSignal = signal<string>("");
  answerTypeSignal = signal<string>("");
  answerOptionsSignal = signal<string[]>([]);
  customAnswerSignal = signal<boolean>(false);
  requireSignal = signal<boolean>(false);

  answerOptionsCountSignal = computed(() => this.answerOptionsSignal().length);

  constructor(
    private router: Router,
    private formService: FormService,
    public dialogRef: MatDialogRef<AddQuestionComponent>
  ) {}

  updateAnswerOption(event: Event, index: number): void {
    const value = (event.target as HTMLInputElement).value;
    this.answerOptionsSignal.update((options) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  }

  removeAnswerOption(index: number): void {
    this.answerOptionsSignal.update((options) => [
      ...options.slice(0, index),
      ...options.slice(index + 1),
    ]);
  }

  addAnswerOption(): void {
    this.answerOptionsSignal.update((options) => [...options, ""]);
  }

  submitForm(): void {
    const formData: QuestionFormData = {
      question: this.questionSignal(),
      answerType: this.answerTypeSignal(),
      answerOptions: this.answerOptionsSignal().filter((item) => !!item),
      customAnswer: this.customAnswerSignal(),
      require: this.requireSignal(),
    };

    this.formService.addQuestion(formData);

    this.router.navigate(["form/builder"]);
    this.dialogRef.close();
  }
}
