import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { ModalService } from "../services/modal/modal.service";

@Component({
  selector: "angular-avnon-home",
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  constructor(private modalService: ModalService) {}

  addQuestionModal(): void {
    this.modalService.addQuestionModal();
  }
}
