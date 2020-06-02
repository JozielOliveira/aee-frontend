import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BuilderQuiz, useLoader } from "components";
import { useGetQuiz, SaveQuiz } from "services";
import { BuilderQuizProps, InputType, TypeQuestionKey } from "types";

export default function QuizPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetQuiz(id);

  useEffect(() => {
    onLoader(loading)
  }, [loading])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  const dataNomalize: BuilderQuizProps = {
    id: data.quiz.id,
    quiz_title: data.quiz.title,
    steps: data.quiz.steps.filter(step => step.questions.length > 0).map(step => ({
      id: step.id,
      position: step.position,
      step_title: step.title,
      questions: step.questions.map(question => {
        const type: TypeQuestionKey = InputType[question.type]

        return {
          id: question.id,
          position: question.position || 0,
          question_title: question.label,
          question_type: type,
          question_answer: question.defaultValue && JSON.parse(question.defaultValue),
          question_options: question.options && question.options !== "null" ? JSON.parse(question.options) : [{ label: '' }]
        }
      })
    }))
  }

  return (
    <SaveQuiz>
      <BuilderQuiz quiz={dataNomalize} />
    </SaveQuiz>
  );
}
