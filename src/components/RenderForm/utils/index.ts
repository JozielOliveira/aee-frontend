import { QuizType } from "types"

export const normalizeQuiz = (quiz: QuizType) => {
  return {
    ...quiz,
    steps: quiz.steps.map((step: any) => ({
      ...step,
      questions: step.questions.map((question: any) => ({
        ...question,
        defaultValue: question.student_responses?.find((r: any) => r.response)?.response,
      }))
    }))
  }
}
