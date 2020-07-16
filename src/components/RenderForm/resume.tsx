import React, { useEffect, useState } from 'react';
import { useGetResponseQuiz } from 'services';
import { useParams } from 'react-router-dom';
import { QuizType } from 'types';
import { normalizeQuiz } from './utils';

export const Resume = ({ title }: { title: string }) => {
  const [quiz, setQuiz] = useState<QuizType>();
  const { idTest = '0', idStudent = '0' } = useParams();
  const { data } = useGetResponseQuiz(idTest, idStudent);

  useEffect(() => {
    if (data?.quiz)
      setQuiz(normalizeQuiz(data.quiz));
  }, [data])

  if (!quiz) return <Finished title={title} />

  return (
    <>
      <Finished title={title} />
      {quiz.steps.map((step, index) => {
        return (
          <div key={index}>

            <h4 className="h4 text-muted font-weight-bold mt-5 mb-4">{step.title}</h4>
            <div className="ml-4">
              {step.questions.map((question, index) => {
                return (
                  <div key={index}>
                    <div className="mb-2">
                      <small className="h6 text-uppercase font-weight-bold">{question.label}</small>
                      {'  '}<small className="h6 text-primary text-lead">{question.defaultValue}</small>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })
      }
    </>
  )
}

const Finished = ({ title }: { title: string }) => {
  return (
    <h3 className="h3 text-success font-weight-bold text-center">
      {title}
    </h3>
  )
}
