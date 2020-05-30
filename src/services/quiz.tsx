import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { BuilderQuizProps, TypeQuestion, QuizType, QuizzesType, QuestionInputService, InputTypeKey } from "types";

type StepInput = {
  quiz?: string;
  title: string;
  description?: string;
}

const QUIZZES = gql`
  query getQuizzes{
    quizzes {
      id
      title
      description
    }
  }
`;

const QUIZ = gql`
  query getQuiz($id: ID!){
    quiz(id: $id) {
      id
      title
      steps {
        id
        title
        questions {
          id
          name
          type
          label
          placeholder
          description
          options
          validations {
            value
          }
        }
      }
    }
  }
`;

const CREATE_QUIZ = gql`
  mutation createQuiz($title: String!, $description: String) {
    createQuiz(input: { data: { title: $title, description: $description } }) {
      quiz {
        id
      }
    }
  }
`;

const CREATE_STEP = gql`
  mutation createStep($step: StepInput!) {
    createStep(input: { data: $step }) {
      step {
        id
      }
    }
  }
`;

const CREATE_QUESTION = gql`
  mutation createQuestion($question: QuestionInput!) {
    createQuestion(input: { data: $question }) {
      question {
        id
      }
    }
  }
`;

const DELETE_QUIZ = gql`
  mutation deleteQuiz($id: ID!) {
    deleteQuiz(input: {
      where: {
        id: $id
      }
    }) {
      quiz {
        id
      }
    }
  }
`

const UPDATE_QUIZ = gql`
  mutation updateQuiz($id: ID!, $title: String!, $description: String){
    updateQuiz(input: {
      data: {
        title: $title,
        description: $description
      }
      where: {
        id: $id
      }
    }) {
      quiz {
        id
      }
    }
  }
`

const UPDATE_STEP = gql`
  mutation updateStep($id: ID!, $step: editStepInput!){
    updateStep(input: {
      data: $step
      where: {
        id: $id
      }
    }) {
      step {
        id
      }
    }
  }
`

const UPDATE_QUESTION = gql`
  mutation updateQuestion($id: ID!, $question: editQuestionInput!){
    updateQuestion(input: {
      data: $question
      where: {
        id: $id
      }
    }) {
      question {
        id
      }
    }
  }
`

const ContextCreateQuiz = React.createContext({
  onCreateQuiz: (quiz: BuilderQuizProps) => { }
})

const ContextUpdateQuiz = React.createContext({
  onUpdateQuiz: (quiz: BuilderQuizProps) => { }
})

export const CreateQuiz: React.FC = ({ children }) => {
  const [createQuiz] = useMutation<{ createQuiz: { quiz: { id: string } } }, { title: string }>(CREATE_QUIZ);
  const [createStep] = useMutation<{ createStep: { step: { id: string } } }, { step: StepInput }>(CREATE_STEP);
  const [createQuestion] = useMutation<{ createQuestion: { step: { id: string } } }, { question: QuestionInputService }>(CREATE_QUESTION);

  const onCreateQuiz = async (quiz: BuilderQuizProps) => {
    const { data } = await createQuiz({ variables: { title: quiz.quiz_title } })

    const quiz_id: string | undefined = data?.createQuiz.quiz.id

    if (quiz_id) {
      quiz.steps.forEach(async step => {
        const { data } = await createStep({
          variables: {
            step: {
              title: step.step_title,
              quiz: quiz_id
            }
          }
        })
        const step_id: string | undefined = data?.createStep.step.id

        step.questions.forEach(async question => {
          if (step_id) {
            let type: InputTypeKey = TypeQuestion[question.question_type]

            await createQuestion({
              variables: {
                question: {
                  name: question.question_title.replace(' ', ''),
                  label: question.question_title,
                  type: type,
                  defaultValue: JSON.stringify(question.question_answer),
                  options: JSON.stringify(question.question_options),
                  step: step_id
                }
              }
            })
          }
        })
      })
    }
  }

  return (
    <ContextCreateQuiz.Provider value={{ onCreateQuiz }}>
      {children}
    </ContextCreateQuiz.Provider>
  )
}

export const UpdateQuiz: React.FC = ({ children }) => {
  const [updateQuiz] =
    useMutation<{ updateQuiz: { quiz: { id: string } } }, { id?: string, title: string, description?: string }>(UPDATE_QUIZ);
  const [updateStep] =
    useMutation<{ updateStep: { step: { id: string } } }, { id?: string, step: StepInput }>(UPDATE_STEP);
  const [updateQuestion] =
    useMutation<{ updateQuestion: { question: { id: string } } }, { id?: string, question: QuestionInputService }>(UPDATE_QUESTION);

  const onUpdateQuiz = async (quiz: BuilderQuizProps) => {
    const { data } = await updateQuiz({ variables: { id: quiz.id, title: quiz.quiz_title } })

    const quiz_id: string | undefined = data?.updateQuiz.quiz.id

    if (quiz_id) {
      quiz.steps.forEach(async step => {
        const { data } = await updateStep({
          variables: {
            id: step.id,
            step: {
              title: step.step_title,
            }
          }
        })
        const step_id: string | undefined = data?.updateStep.step.id

        step.questions.forEach(async question => {
          if (step_id) {
            let type: InputTypeKey = TypeQuestion[question.question_type]

            await updateQuestion({
              variables: {
                id: question.id,
                question: {
                  name: question.question_title.replace(' ', ''),
                  label: question.question_title,
                  type: type,
                  defaultValue: JSON.stringify(question.question_answer),
                  options: JSON.stringify(question.question_options),
                }
              }
            })
          }
        })
      })
    }
  }

  return (
    <ContextUpdateQuiz.Provider value={{ onUpdateQuiz }}>
      {children}
    </ContextUpdateQuiz.Provider>
  )
}

export const useUpdateQuiz = () => {
  const context = useContext(ContextUpdateQuiz)

  return context
}

export const useCreateQuiz = () => {
  const context = useContext(ContextCreateQuiz)

  return context
}
export const useDeleteQuiz = () =>
  useMutation<{ deleteQuiz: { quiz: { id: string } } }, { id: string }>(DELETE_QUIZ);

export const useGetQuiz = (id: string) =>
  useQuery<{ quiz: QuizType }>(QUIZ, { variables: { id } });

export const useGetQuizzes = () =>
  useQuery<{ quizzes: QuizzesType[] }>(QUIZZES);

