import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// core components
import { BuilderQuiz } from "components";
import { BuilderQuizProps, TypeQuestion } from "types";

type StepInput = { quiz: string, title: string, description?: string }
type QuestionInput = { step: string, name: string, type: string, label: string, description?: string, placeholder?: string, defaultValue?: string }

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
  mutation createQuestion($question: QuestionInput!) {
    createQuestion(input: { data: $question }) {
      question {
        id
      }
    }
  }
`;

export default function BuildForm() {
  const [createQuiz] = useMutation<{
    createQuiz: {
      quiz: {
        id: string
      }
    }
  }, { title: string }>(CREATE_QUIZ);
  const [createStep] = useMutation<{
    createStep: {
      step: {
        id: string
      }
    }
  }, { step: StepInput }>(CREATE_STEP);
  const [createQuestion] = useMutation<{
    createStep: {
      step: {
        id: string
      }
    }
  }, { question: QuestionInput }>(CREATE_QUESTION);

  const handleCreateQuiz = async (quiz: BuilderQuizProps) => {
    const { data } = await createQuiz({
      variables: {
        title: quiz.quiz_title
      }
    })

    const quiz_id: string | undefined = data?.createQuiz.quiz.id

    if (quiz_id) {
      const { data } = await createStep({
        variables: {
          step: {
            title: `Teste ${quiz_id}`,
            quiz: quiz_id
          }
        }
      })
      const step_id: string | undefined = data?.createStep.step.id

      if (step_id)
        quiz.questions.forEach(async question => {
          await createQuestion({
            variables: {
              question: {
                name: question.question_title.replace(' ', ''),
                label: question.question_title,
                type: TypeQuestion[question.question_type],
                defaultValue: question.question_answer,
                step: step_id
              }
            }
          })
        })
    }

  }

  return (
    <>
      <main>
        <BuilderQuiz
          initialValues={{ quiz_title: '', questions: [{ question_title: '', question_type: 'Texto', question_answer: '' }] }}
          onSubmit={handleCreateQuiz}
        />
      </main>
    </>
  );
}
