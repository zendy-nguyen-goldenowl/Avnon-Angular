export interface QuestionFormData {
  question: string;
  answerType: string;
  answerOptions: string[];
  customAnswer: boolean;
  require: boolean;
}

export interface AnswerData {
  type: "paragraph" | "checkbox";
  question: string;
  paragraphAnswer: string;
  checkboxAnswer: string[];
}
