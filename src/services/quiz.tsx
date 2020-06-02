import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { BuilderQuizProps, TypeQuestion, QuizType, QuizzesType, QuestionInputService, InputTypeKey, BuildStepType, BuildQuestionType } from "types";
import { useAlert, useLoader } from "components";

type StepInput = {
  position?: number;
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
      steps (sort: "position") {
        id
        title
        position
        questions (sort: "position") {
          id
          name
          type
          label
          placeholder
          description
          options
          defaultValue
          position
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

const ContextSaveQuiz = React.createContext({
  onSaveQuiz: (quiz: BuilderQuizProps) => { }
})

export const SaveQuiz: React.FC = ({ children }) => {
  const { onAlert } = useAlert()
  const { onLoader } = useLoader()
  const [createQuiz] = useMutation<{ createQuiz: { quiz: { id: string } } }, { title: string }>(CREATE_QUIZ);
  const [createStep] = useMutation<{ createStep: { step: { id: string } } }, { step: StepInput }>(CREATE_STEP);
  const [createQuestion] = useMutation<{ createQuestion: { step: { id: string } } }, { question: QuestionInputService }>(CREATE_QUESTION);
  const [updateQuiz] = useMutation<{ updateQuiz: { quiz: { id: string } } }, { id?: string, title: string, description?: string }>(UPDATE_QUIZ);
  const [updateStep] = useMutation<{ updateStep: { step: { id: string } } }, { id?: string, step: StepInput }>(UPDATE_STEP);
  const [updateQuestion] = useMutation<{ updateQuestion: { question: { id: string } } }, { id?: string, question: QuestionInputService }>(UPDATE_QUESTION);

  const handleSaveQuestion = (questions: BuildQuestionType[], step_id: string) => {
    questions.forEach(async question => {
      let type: InputTypeKey = TypeQuestion[question.question_type]

      let questionNormalise = {
        position: question.position,
        name: question.question_title.replace(/ /i, '_'),
        label: question.question_title,
        type: type,
        defaultValue: JSON.stringify(question.question_answer),
        options: JSON.stringify(question.question_options),
      }

      if (question.id)
        await updateQuestion({
          variables: {
            id: question.id,
            question: questionNormalise
          }
        })
      else
        await createQuestion({
          variables: {
            question: {
              ...questionNormalise,
              step: step_id
            }
          }
        })

    })
  }

  const handleSaveStep = (steps: BuildStepType[], quiz_id: string) => {
    steps.forEach(async step => {
      let response_step: any
      let step_id: string | undefined

      if (step.id) {
        response_step = await updateStep({
          variables: {
            id: step.id,
            step: {
              position: step.position,
              title: step.step_title,
            }
          }
        })
        step_id = response_step.data?.updateStep.step.id

      } else {
        response_step = await createStep({
          variables: {
            step: {
              title: step.step_title,
              position: step.position,
              quiz: quiz_id
            }
          }
        })
        step_id = response_step.data?.createStep.step.id
      }

      if (step_id) handleSaveQuestion(step.questions, step_id)
    })
  }

  const onSaveQuiz = async (quiz: BuilderQuizProps) => {
    onLoader(true)
    try {
      let response_quiz: any
      let quiz_id: string | undefined

      if (quiz.id) {
        response_quiz = await updateQuiz({ variables: { id: quiz.id, title: quiz.quiz_title } })
        quiz_id = response_quiz.data?.updateQuiz.quiz.id
      } else {
        response_quiz = await createQuiz({ variables: { title: quiz.quiz_title } })
        quiz_id = response_quiz.data?.createQuiz.quiz.id
      }


      if (quiz_id) handleSaveStep(quiz.steps, quiz_id)

      onAlert('Salvo com sucesso', 'success')

    } catch (error) {
      console.log(error)
      onAlert('Erro ao salvar', 'error')
    }
    onLoader(false)
  }

  return (
    <ContextSaveQuiz.Provider value={{ onSaveQuiz }}>
      {children}
    </ContextSaveQuiz.Provider>
  )
}

export const useSaveQuiz = () => {
  const context = useContext(ContextSaveQuiz)

  return context
}

export const useDeleteQuiz = () =>
  useMutation<{ deleteQuiz: { quiz: { id: string } } }, { id: string }>(DELETE_QUIZ);

export const useGetQuiz = (id: string) =>
  useQuery<{ quiz: QuizType }>(QUIZ, { variables: { id } });

export const useGetQuizzes = () =>
  useQuery<{ quizzes: QuizzesType[] }>(QUIZZES);

