import { Route } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BuilderComponent } from "./builder/builder.component";
import { AnswerComponent } from "./answer/answer.component";
import { HomeComponent } from "./home/home.component";

export const appRoutes: Route[] = [
  { path: "home", component: HomeComponent },
  { path: "form/builder", component: BuilderComponent },
  { path: "form/answers", component: AnswerComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];
