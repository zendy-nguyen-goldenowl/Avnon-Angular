import { Component, signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
    ReactiveFormsModule,
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
  form: FormGroup;
  answerTypes = ANSWER_TYPES;

  questionSignal = signal<string>("");
  answerTypeSignal = signal<string>("");
  answerOptionsSignal = signal<string[]>([]);
  customAnswerSignal = signal<boolean>(false);
  requireSignal = signal<boolean>(false);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formService: FormService,
    public dialogRef: MatDialogRef<AddQuestionComponent>
  ) {
    this.form = this.formBuilder.group({
      question: ["", Validators.required],
      answerType: ["", Validators.required],
      answerOptions: this.formBuilder.array([]),
      customAnswer: [false],
      require: [false],
    });

    this.form.valueChanges.subscribe((formValue) => {
      this.questionSignal.set(formValue.question);
      this.answerTypeSignal.set(formValue.answerType);
      this.answerOptionsSignal.set(formValue.answerOptions);
      this.customAnswerSignal.set(formValue.customAnswer);
      this.requireSignal.set(formValue.require);
    });
  }

  updateAnswerOption(event: Event, index: number): void {
    const value = (event.target as HTMLInputElement).value;
    const answerOptions = this.form.get("answerOptions") as FormArray;
    answerOptions.at(index).setValue(value);
  }

  get answerOptions(): FormArray {
    return this.form.get("answerOptions") as FormArray;
  }

  addAnswerOption(): void {
    const answerOptions = this.form.get("answerOptions") as FormArray;
    answerOptions.push(
      this.formBuilder.group({
        option: ["", Validators.required],
      })
    );
  }

  removeAnswerOption(index: number): void {
    const answerOptions = this.form.get("answerOptions") as FormArray;
    answerOptions.removeAt(index);
  }

  submitForm(): void {
    if (this.form.valid) {
      const formData: QuestionFormData = {
        question: this.form.value.question,
        answerType: this.form.value.answerType,
        answerOptions: this.form.value.answerOptions.map(
          (option: { option: string }) => option.option
        ),
        customAnswer: this.form.value.customAnswer,
        require: this.form.value.require,
      };

      this.formService.addQuestion(formData);

      this.router.navigate(["form/builder"]);
      this.dialogRef.close();
    }
  }
}
