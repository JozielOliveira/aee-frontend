import React, { useState, useEffect } from "react";
import { Navbar, Container } from 'reactstrap'

import { RenderForm } from "components";
import { useSaveQuiz } from "services";
import { QuizType } from "types";
import { normalizeQuiz } from "components/RenderForm/utils";

export default function FormResponse({ data, idStudent }: any) {
  const { onResponseQuestion } = useSaveQuiz()
  const [quiz, setQuiz] = useState<QuizType>()

  const handleSubmit = (params: any) => {
    const keys = Object.keys(params.response)

    if (data)
      data.quiz.steps.forEach((step: any) => {
        if (step.id === params.step_id)
          step.questions.forEach((question: any) => {
            keys.forEach(elem => {
              if (elem === question.name) {
                onResponseQuestion({
                  id: question.student_responses?.find((r: any) => r.response)?.id || null,
                  response: params.response[elem],
                  student: idStudent,
                  question: question.id
                })
              }
            })
          })
      })
  }

  useEffect(() => {
    setQuiz(normalizeQuiz(data.quiz))
  }, [data.quiz])

  if (!quiz) return null

  return (
    <main>
      <Navbar className="navbar-dark bg-default fixed-top" expand="lg">
        <Container>
          <h4 className="text-white text-uppercase font-weight-bold text-center">
            {quiz.title}
          </h4>
        </Container>
      </Navbar>
      <Container className='mb-8'>
      </Container>
      <RenderForm quiz={quiz} onSubmit={handleSubmit} />
    </main>
  );
}
