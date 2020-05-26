export type ValidationType = {
  value: "required" | "email";
};

export interface QuestionType {
  id: string;
  name: string;
  type: InputTypeKey;
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

export type BuildQuestionType = {
  question_title: string;
  question_type: TypeQuestionKey;
  question_answer: string;
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
  questions: BuildQuestionType[]
}

export type BuilderQuizProps = {
  quiz_title: string;
  questions: BuildQuestionType[];
}
