import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { AddQuestionComponent } from "../shared/add-question/add-question.component";

@Component({
  selector: "angular-avnon-home",
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  addQuestionModal(): void {
    this.dialog.open(AddQuestionComponent, {
      width: "80%",
    });
  }
}
