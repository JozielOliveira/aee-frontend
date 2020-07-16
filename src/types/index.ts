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
  value?: any;
  student_responses?: {
    response: any
  }
}

export interface StepType {
  id: string;
  title: string;
  description?: string;
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
  description: string;
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
  'Data' = 'date',
  'Multipla Escolha' = 'options',
  'Caixa de seleção' = 'checklist',
  'Numero' = 'number',
  'password' = 'password'
};

export enum InputType {
  'text' = 'Texto',
  'boolean' = 'Booleano',
  'date' = 'Data',
  'options' = 'Multipla Escolha',
  'checklist' = 'Caixa de seleção',
  'number' = 'Numero',
  'password' = 'password'
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
  step_description?: string;
  questions: BuildQuestionType[];
}

export type BuilderQuizProps = {
  id?: string;
  quiz_title: string;
  quiz_description: string;
  steps: BuildStepType[];
}
