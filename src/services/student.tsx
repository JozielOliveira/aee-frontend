import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useAlert, useLoader } from "components";

export type StudentType = {
  id?: string;
  name: string;
}

const STUDENTS = gql`
  query getStudents{
    students {
      id
      name
    }
  }
`;

const STUDENT = gql`
  query getQuiz($id: ID!){
    student(id: $id) {
      id
      name
    }
  }
`;

const CREATE_STUDENT = gql`
  mutation createStudent($student: StudentInput) {
    createStudent(input: {
      data: $student
    }) {
      student {
        id
        name
      }
    }
  }
`;


const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID!) {
    deleteStudent(input: {
      where: {
        id: $id
      }
    }) {
      student {
        id
      }
    }
  }
`

const UPDATE_STUDENT = gql`
  mutation updateStudent($id: ID!, $student: editStudentInput!){
    updateStudent(input: {
      data: $student
      where: {
        id: $id
      }
    }) {
      student {
        id
      }
    }
  }
`

const ContextSaveStudent = React.createContext({
  onSaveStudent: (student: StudentType) => { }
})

export const SaveStudent: React.FC = ({ children }) => {
  const { onAlert } = useAlert()
  const { onLoader } = useLoader()
  const [createStudent] = useMutation<{ createStudent: { student: { id: string } } }, { student: StudentType }>(CREATE_STUDENT);
  const [updateStudent] = useMutation<{ updateStudent: { student: { id: string } } }, { id: string, student: StudentType }>(UPDATE_STUDENT);


  const onSaveStudent = async (student: StudentType) => {
    onLoader(true)
    try {
      if (student.id)
        await updateStudent({ variables: { id: student.id, student: { name: student.name } } })
      else
        await createStudent({ variables: { student: { name: student.name } } })

      onAlert('Salvo com sucesso', 'success')
    } catch (error) {
      console.log(error)
      onAlert('Erro ao salvar', 'error')
    }
    onLoader(false)
  }

  return (
    <ContextSaveStudent.Provider value={{ onSaveStudent }}>
      {children}
    </ContextSaveStudent.Provider>
  )
}

export const useSaveStudent = () => {
  const context = useContext(ContextSaveStudent)

  return context
}

export const useDeleteStudent = () =>
  useMutation<{ deleteStudent: { student: { id: string } } }, { id: string }>(DELETE_STUDENT);

export const useGetStudent = (id: string) =>
  useQuery<{ student: StudentType }>(STUDENT, { variables: { id } });

export const useGetStudents = () =>
  useQuery<{ students: StudentType[] }>(STUDENTS);

