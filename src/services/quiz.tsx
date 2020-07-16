import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { BuilderQuizProps, TypeQuestion, QuizType, QuizzesType, QuestionInputService, InputTypeKey, BuildStepType, BuildQuestionType } from "types";
import { useAlert, useLoader } from "components";
import { useAdmin } from "hooks";

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
      description
      steps (sort: "position") {
        id
        title
        description
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

const QUIZ_STUDENT = gql`
  query getStudent($id: ID!, $idStudent: ID!){
    quiz(id: $id) {
      id
      title
      description
      steps (sort: "position") {
        id
        title
        description
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
          student_responses (where: {
            student: $idStudent
          }) {
            id
            response
          }
        }
      }
    }
  }
`;

const ADD_QUIZ = gql`
  mutation createQuiz($title: String!, $description: String) {
    createQuiz(input: { data: { title: $title, description: $description } }) {
      quiz {
        id
        title
        description
      }
    }
  }
`;

const ADD_STEP = gql`
  mutation createStep($step: StepInput!) {
    createStep(input: { data: $step }) {
      step {
        id
        title
        description
        position
        quiz {
          id
        }
      }
    }
  }
`;

const ADD_QUESTION = gql`
  mutation createQuestion($question: QuestionInput!) {
    createQuestion(input: { data: $question }) {
      question {
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
        title
        description
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
        title
        description
        position
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
`

const RESPONSE_QUESTION = gql`
  mutation createStudentResponse($studentResponse: StudentResponseInput){
    createStudentResponse(input: {
      data: $studentResponse
    }) {
      studentResponse {
        id
        response
      }
    }
  }
`
const UPDATE_RESPONSE_QUESTION = gql`
  mutation updateStudentResponse($id: ID!, $studentResponse: editStudentResponseInput){
    updateStudentResponse(input: {
      data: $studentResponse
      where: {
        id: $id
      }
    }) {
      studentResponse {
        id
        response
      }
    }
  }
`

const ContextSaveQuiz = React.createContext({
  onSaveQuiz: (quiz: BuilderQuizProps) => { },
  onResponseQuestion: (response: any) => { },
})

export const SaveQuiz: React.FC = ({ children }) => {
  const { onAlert } = useAlert()
  const { onLoader } = useLoader()
  const { user } = useAdmin()

  const [createQuiz] = useMutation<
    { createQuiz: { quiz: { id: string } } },
    { creator?: string, title: string, description?: string }
  >(ADD_QUIZ, {
    update(cache, { data: { createQuiz } }: any) {
      const { quizzes }: any = cache.readQuery({ query: QUIZZES });
      cache.writeQuery({
        query: QUIZZES,
        data: { quizzes: quizzes.concat([createQuiz.quiz]) },
      });
    }
  });

  const [createStep] = useMutation<
    { createStep: { step: { id: string; quiz: { id: string } } } },
    { step: StepInput }
  >(ADD_STEP, {
    update(cache, { data: { createStep: { step: { quiz: { id }, ...step } } } }: any) {
      const { quiz: quiz_old }: any = cache.readQuery({ query: QUIZ, variables: { id } });
      console.log({ ...quiz_old, steps: [...quiz_old.steps, { ...step, questions: [] }] })

      cache.writeQuery({
        query: QUIZ,
        variables: { id },
        data: {
          quiz: {
            ...quiz_old, steps: [...quiz_old.steps, {
              id: step.id,
              description: step.description,
              position: step.postion,
              title: step.title,
              questions: [],
            }]
          }
        },
      });
    }
  });

  const [createQuestion] = useMutation<{ createQuestion: { step: { id: string } } }, { question: QuestionInputService }>(ADD_QUESTION);
  const [updateQuiz] = useMutation<{ updateQuiz: { quiz: { id: string } } }, { id?: string, creator?: string, title: string, description?: string }>(UPDATE_QUIZ);
  const [updateStep] = useMutation<{ updateStep: { step: { id: string } } }, { id?: string, step: StepInput }>(UPDATE_STEP);
  const [updateQuestion] = useMutation<{ updateQuestion: { question: { id: string } } }, { id?: string, question: QuestionInputService }>(UPDATE_QUESTION);
  const [responseQuestion] = useMutation<{ studentResponse: { question: { id: string } } }, { studentResponse: { response: string, student: string, question: string } }>(RESPONSE_QUESTION);
  const [updateResponseQuestion] = useMutation<{ studentResponse: { question: { id: string } } }, { id: string, studentResponse: { response: string, student: string, question: string } }>(UPDATE_RESPONSE_QUESTION);

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
      let step_data: StepInput = {
        position: step.position,
        title: step.step_title,
        description: step.step_description
      }

      if (step.id) {
        response_step = await updateStep({
          variables: {
            id: step.id,
            step: step_data
          }
        })
        step_id = response_step.data?.updateStep.step.id

      } else {
        response_step = await createStep({
          variables: {
            step: {
              ...step_data,
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
      let quiz_data = {
        title: quiz.quiz_title,
        description: quiz.quiz_description,
        creator: user?.id
      }

      if (quiz.id) {
        response_quiz = await updateQuiz({ variables: { ...quiz_data, id: quiz.id } })
        quiz_id = response_quiz.data?.updateQuiz.quiz.id
      } else {
        response_quiz = await createQuiz({ variables: quiz_data })
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

  const onResponseQuestion = async ({ id, ...params }: any) => {
    onLoader(true)
    try {
      if (id)
        await updateResponseQuestion({ variables: { id, studentResponse: params } })
      else
        await responseQuestion({ variables: { studentResponse: params } })

      onAlert('Salvo com sucesso', 'success')
    } catch (error) {
      console.log(error)
      onAlert('Erro ao salvar', 'error')
    }
    onLoader(false)
  }
  return (
    <ContextSaveQuiz.Provider value={{ onSaveQuiz, onResponseQuestion }}>
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

export const useGetResponseQuiz = (id: string, idStudent: string) =>
  useQuery<{ quiz: QuizType }>(QUIZ_STUDENT, { variables: { id, idStudent } });

export const useGetQuizzes = () =>
  useQuery<{ quizzes: QuizzesType[] }>(QUIZZES);

