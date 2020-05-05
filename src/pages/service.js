import { gql } from 'apollo-boost'

export const STUDENT_RESPONSES = gql`{
  quiz(id:1) {
    title
    steps {
      id
      title
      questions {
        name
        student_responses(where: {
          student : {  id: 1 }
        }) {
          response
        }
      }
    }
  }
}`