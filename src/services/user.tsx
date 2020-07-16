import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useAlert, useLoader } from "components";
import { useHistory } from "react-router-dom";

export type UserType = {
  id?: string;
  username: string;
  email: string;
  password: string;
  role?: string | {
    name: string;
  };
}

const USERS = gql`
  query getUsers{
    users {
      id
      username
      email
      profession
      role {
        name
      }
    }
  }
`;

const USER = gql`
  query getUser($id: ID!){
    user(id: $id) {
      id
      username
      email
      profession
      role {
        name
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(input: {
      data: $user
    }) {
      user {
        id
        username
        email
        profession
        role {
          name
        }
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(input: {
      where: {
        id: $id
      }
    }) {
      user {
        id
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $user: editUserInput!){
    updateUser(input: {
      data: $user
      where: {
        id: $id
      }
    }) {
      user {
        id
        username
        email
        profession
        role {
          name
        }
      }
    }
  }
`

const ContextSaveUser = React.createContext({
  onSaveUser: (user: UserType) => { }
})

export const SaveUser: React.FC = ({ children }) => {
  const { onAlert } = useAlert()
  const { onLoader } = useLoader()
  const [createUser] = useMutation<{ createUser: { user: { id: string } } }, { user: UserType }>(CREATE_USER);
  const [updateUser] = useMutation<{ updateUser: { user: { id: string } } }, { id: string, user: UserType }>(UPDATE_USER);
  const { push } = useHistory();

  const onSaveUser = async ({ id, ...user }: UserType) => {
    console.log(user)
    onLoader(true)
    const user_data = {
      ...user,
      role: typeof user.role !== 'string' && user.role?.name && user.role.name === "Administrator" ? "1" : "2"
    }

    try {
      if (id)
        await updateUser({ variables: { id, user: user_data } })
      else
        await createUser({ variables: { user: { ...user_data } } })

      onAlert('Salvo com sucesso', 'success')
      push('/professionals')
    } catch (error) {
      console.log(error)
      onAlert('Erro ao salvar', 'error')
    }
    onLoader(false)
  }

  return (
    <ContextSaveUser.Provider value={{ onSaveUser }}>
      {children}
    </ContextSaveUser.Provider>
  )
}

export const useSaveUser = () => {
  const context = useContext(ContextSaveUser)

  return context
}

export const useDeleteUser = () =>
  useMutation<{ deleteUser: { user: { id: string } } }, { id: string }>(DELETE_USER);

export const useGetUser = (id: string) =>
  useQuery<{ user: UserType }>(USER, { variables: { id } });

export const useGetUsers = () =>
  useQuery<{ users: UserType[] }>(USERS);

