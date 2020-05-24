import { InputType } from "components";

export type ValidationType = {
  value: "required" | "email";
};

export interface QuestionType {
  id: string;
  name: string;
  type: InputType;
  label?: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  validations?: ValidationType[];
  value?: any;
}

export interface StepType {
  id: string;
  questions: QuestionType[];
}

export interface StepResponseType {
  step_id: string;
  quiz_id: string;
  response: QuestionType[];
}

export interface QuizType {
  id: string;
  title: string;
  steps: StepType[];
}
