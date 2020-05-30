import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { BuilderQuizProps, TypeQuestion, QuizType, QuestionInputService } from "types";

type StepInput = {
  quiz: string;
  title: string;
  description?: string;
}

const QUIZ = gql`
  query getQuiz($id: ID!){
    quiz(id: $id) {
      id
      title
      steps {
        id
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
  mutation createQuiz($title: String!) {
    createQuiz(input: { data: { title: $title } }) {
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
  mutation createQuestion($question: QuestionInputService!) {
    createQuestion(input: { data: $question }) {
      question {
        id
      }
    }
  }
`;

const ContextQuiz = React.createContext({
  onCreateQuiz: (quiz: BuilderQuizProps) => { }
})

export const CreateQuiz: React.FC = ({ children }) => {
  const [createQuiz] = useMutation<{ createQuiz: { quiz: { id: string } } }, { title: string }>(CREATE_QUIZ);
  const [createStep] = useMutation<{ createStep: { step: { id: string } } }, { step: StepInput }>(CREATE_STEP);
  const [createQuestion] = useMutation<{ createStep: { step: { id: string } } }, { question: QuestionInputService }>(CREATE_QUESTION);

  const onCreateQuiz = async (quiz: BuilderQuizProps) => {
    const { data } = await createQuiz({ variables: { title: quiz.quiz_title } })

    const quiz_id: string | undefined = data?.createQuiz.quiz.id

    if (quiz_id) {
      quiz.steps.forEach(async step => {
        const { data } = await createStep({
          variables: {
            step: {
              title: step.question_title,
              quiz: quiz_id
            }
          }
        })
        const step_id: string | undefined = data?.createStep.step.id

        step.questions.forEach(async question => {
          if (step_id)
            await createQuestion({
              variables: {
                question: {
                  name: question.question_title.replace(' ', ''),
                  label: question.question_title,
                  type: TypeQuestion[question.question_type],
                  defaultValue: JSON.stringify(question.question_answer),
                  options: JSON.stringify(question.question_options),
                  step: step_id
                }
              }
            })
        })
      })
    }
  }

  return (
    <ContextQuiz.Provider value={{ onCreateQuiz }}>
      {children}
    </ContextQuiz.Provider>
  )
}

export const useCreateQuiz = () => {
  const context = useContext(ContextQuiz)

  return context
}

export const useGetQuiz = (id: string) =>
  useQuery<{ quiz: QuizType }>(QUIZ, { variables: { id } });

