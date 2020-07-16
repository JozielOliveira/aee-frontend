import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useAlert, useLoader } from "components";
import { format } from 'date-fns';
import { useHistory } from "react-router-dom";
import { useAdmin } from "hooks";

export type StudentType = {
  id?: string;
  name: string;
  gender?: string;
  date_birth: any;
  age?: number;
  zip_code?: string;
  nationality?: string;
  state?: string;
  city?: string;
  street?: string;
  school?: string;
  school_grade?: string;
  teacher?: string;
  responsible_name?: string;
  responsible_phone_number?: string;
  user?: any;
}

const STUDENTS = gql`
  query getStudents($id: ID!){
    students(where: { user: $id }){
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
      gender
      date_birth
      age
      zip_code
      nationality
      state
      city
      street
      school
      school_grade
      teacher
      responsible_name
      responsible_phone_number
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
        gender
        date_birth
        age
        zip_code
        nationality
        state
        city
        street
        school
        school_grade
        teacher
        responsible_name
        responsible_phone_number
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
        name
        gender
        date_birth
        age
        zip_code
        nationality
        state
        city
        street
        school
        school_grade
        teacher
        responsible_name
        responsible_phone_number
      }
    }
  }
`

const FLOW = gql`
  query {
    flows {
      name
      description
      quiz {
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
  const { push } = useHistory()
  const { user } = useAdmin()

  const [createStudent] = useMutation<{ createStudent: { student: { id: string } } }, { student: StudentType }>(CREATE_STUDENT);
  const [updateStudent] = useMutation<{ updateStudent: { student: { id: string } } }, { id: string, student: StudentType }>(UPDATE_STUDENT);

  const onSaveStudent = async ({ id, ...student }: StudentType) => {
    onLoader(true)
    const date_birth = format(new Date(student.date_birth), "yyyy-MM-dd");
    try {
      if (id)
        await updateStudent({ variables: { id, student: { ...student, date_birth, user: user?.id } } })
      else
        await createStudent({ variables: { student: { ...student, date_birth, user: user?.id } } })

      onAlert('Salvo com sucesso', 'success')
      push('/estudantes')
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

export const useGetStudents = (id: string) =>
  useQuery<{ students: StudentType[] }, { id: string }>(STUDENTS, { variables: { id } });

export const useGetFlow = () =>
  useQuery<{ flows: { name: string, description: string, quiz: { id: string } }[] }>(FLOW);

