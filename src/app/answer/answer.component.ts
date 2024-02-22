import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AnswerData } from "../interfaces/question-form-data.interface";
import { FormService } from "../services/form/form.service";

@Component({
  selector: "angular-avnon-answer",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./answer.component.html",
  styleUrl: "./answer.component.css",
})
export class AnswerComponent {
  answers$: Observable<AnswerData[]> = new Observable<AnswerData[]>();

  constructor(private router: Router, private formService: FormService) {}

  ngOnInit(): void {
    this.answers$ = this.formService.getAnswers();
  }

  backToFormBuilder() {
    this.router.navigate(["form/builder"]);
  }
}
