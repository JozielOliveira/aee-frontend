import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router";

import { useAlert, useLoader } from "components";
import { useAdmin } from "hooks";

export type AuthType = {
  jwt: string;
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: {
      name: string;
    };
  }
}

export type LoginType = {
  identifier: string;
  password: string;
}

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  role?: number;
}


const REGISTER = gql`
  mutation register($user: UserInput!) {
    register(input:$user) {
      jwt
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`;

const LOGIN = gql`
  mutation login($user: UsersPermissionsLoginInput!) {
    login(input:$user) {
      jwt
      user {
        id
        username
        email
        role {
          name
        }
      }
    }
  }
`;

const ContextAuthUser = React.createContext({
  onRegister: (user: RegisterType) => { },
  onLogin: (user: LoginType) => { }
})

export const AuthUser: React.FC = ({ children }) => {
  const { onAlert } = useAlert()
  const { onLoader } = useLoader()
  const [registerUser] = useMutation<{ register: AuthType }, { user: RegisterType }>(REGISTER);
  const [loginUser] = useMutation<{ login: AuthType }, { user: LoginType }>(LOGIN);
  const { setUser } = useAdmin();
  const { push } = useHistory();

  const onRegister = async (user: RegisterType) => {
    try {
      onLoader(true)
      const result = await registerUser({ variables: { user: { ...user, role: 2 } } })

      if (!result.data?.register)
        throw new Error();

      onAlert('Registrado com sucesso', 'success')
      await setUser(result.data.register)
      push('/estudantes')
    } catch (error) {
      console.log(error)
      onAlert('Erro ao registrar', 'error')
    }
    onLoader(false)
  }

  const onLogin = async (user: LoginType) => {
    try {
      onLoader(true)
      const result = await loginUser({ variables: { user: { ...user } } })

      if (!result.data?.login)
        throw new Error();

      onAlert('Login efetuado com sucesso', 'success')
      await setUser(result.data.login)
      push('/estudantes')
    } catch (error) {
      console.log(error)
      onAlert('Email ou senha inválida', 'error')
    }
    onLoader(false)
  }

  return (
    <ContextAuthUser.Provider value={{ onRegister, onLogin }}>
      {children}
    </ContextAuthUser.Provider>
  )
}

export const useAuthUser = () => {
  const context = useContext(ContextAuthUser)

  return context
}
