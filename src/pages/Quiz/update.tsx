import React from "react";
import { useParams } from "react-router-dom";
import { BuilderQuiz } from "components";
import { useGetQuiz, UpdateQuiz } from "services";
import { BuilderQuizProps, InputType, TypeQuestionKey } from "types";

export default function QuizPage() {
  const { id } = useParams();
  const { loading, error, data } = useGetQuiz(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>
  const dataNomalize: BuilderQuizProps = {
    id: data.quiz.id,
    quiz_title: data.quiz.title,
    steps: data.quiz.steps.map(step => ({
      id: step.id,
      step_title: step.title,
      questions: step.questions.map(question => {
        const type: TypeQuestionKey = InputType[question.type]

        return {
          id: question.id,
          question_title: question.label,
          question_type: type,
          question_answer: question.defaultValue && JSON.parse(question.defaultValue),
          question_options: question.options && JSON.parse(question.options)
        }
      }),
    }))
  }

  return (
    <UpdateQuiz>
      <BuilderQuiz update={true} quiz={dataNomalize} />
    </UpdateQuiz>
  );
}
