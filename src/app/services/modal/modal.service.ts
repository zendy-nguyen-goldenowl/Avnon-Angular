import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddQuestionComponent } from "../../shared/add-question/add-question.component";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  addQuestionModal(): void {
    this.dialog.open(AddQuestionComponent, {
      width: "80%",
    });
  }
}
