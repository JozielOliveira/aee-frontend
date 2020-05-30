import { Option } from "components";

export type ValidationType = {
  value: "required" | "email";
};

export interface QuestionType {
  id?: string;
  name: string;
  type: InputTypeKey;
  label?: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  validations?: ValidationType[];
  options?: Option[];
  value?: any;
}

export type QuestionInputService = {
  id?: string;
  step: string;
  name: string;
  type: any;
  label: string;
  options?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface StepType {
  id: string;
  questions: QuestionInputService[];
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

export type BuildQuestionType = {
  question_title: string;
  question_type: TypeQuestionKey;
  question_answer: string;
  question_options?: Option[];
}

export enum TypeQuestion {
  'Texto' = 'string',
  'Booleano' = 'boolean',
  'Multipla Escolha' = 'options',
  'Caixa de seleção' = 'checklist',
  'Numero' = 'number'
};

export enum InputType {
  'text' = 'Texto',
  'boolean' = 'Booleano',
  'options' = 'Multipla Escolha',
  'checklist' = 'Caixa de seleção',
  'number' = 'Numero'
};

export type TypeQuestionKey = keyof typeof TypeQuestion;
export type InputTypeKey = keyof typeof InputType;

export type BuidQuestionsProps = {
  step_id: string;
  questions: BuildQuestionType[]
}

export type BuildStepType = {
  question_title: string;
  questions: BuildQuestionType[];
}

export type BuilderQuizProps = {
  quiz_title: string;
  steps: BuildStepType[];
}
