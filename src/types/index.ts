import { Option } from "components";

export type ValidationType = {
  value: "required" | "email";
};

export interface QuestionType {
  id?: string;
  position?: number;
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
  position?: number;
  step?: string;
  name: string;
  type: InputTypeKey;
  label: string;
  options?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface StepType {
  id: string;
  title: string;
  position: number;
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

export interface QuizzesType {
  id: string;
  title: string;
  description: string;
}
export type BuildQuestionType = {
  id?: string;
  position: number;
  question_title: string;
  question_type: TypeQuestionKey;
  question_answer: string;
  question_options?: Option[];
}

export enum TypeQuestion {
  'Texto' = 'text',
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
  id?: string;
  step_id: string;
  questions: BuildQuestionType[]
}

export type BuildStepType = {
  id?: string;
  position: number;
  step_title: string;
  questions: BuildQuestionType[];
}

export type BuilderQuizProps = {
  id?: string;
  quiz_title: string;
  steps: BuildStepType[];
}
