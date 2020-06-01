import { RouteType } from "hooks";

import Index from "views/Index";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";

import Quiz from "pages/Quiz/quiz";
import Quizzes from "pages/Quiz/list";
import CreateQuiz from "pages/Quiz/create";
import UpdateQuiz from "pages/Quiz/update";

import Student from "pages/Student/student";
import Students from "pages/Student/list";
import CreateStudent from "pages/Student/create";
import UpdateStudent from "pages/Student/update";

export const routes: RouteType[] = [
  {
    name: 'Home',
    path: "/",
    exact: true,
    component: Index
  },
  {
    name: 'Langin Page',
    path: "/landing-page",
    exact: true,
    component: Landing
  },
  {
    name: 'Login',
    path: "/login-page",
    exact: true,
    component: Login
  },
  {
    name: 'Perfil',
    path: "/profile-page",
    exact: true,
    component: Profile
  },
  {
    name: 'Registrar',
    path: "/register-page",
    exact: true,
    component: Register
  },
  {
    name: 'Estudantes',
    path: "/estudantes",
    exact: true,
    component: Students,
    showItem: true
  },
  {
    name: 'Estudante',
    path: "/estudante/:id",
    component: Student
  },
  {
    name: 'Criar Estudante',
    path: "/create-estudante",
    exact: true,
    component: CreateStudent,
    showItem: true
  },
  {
    name: 'Atualizar Estudante',
    path: "/update-estudante/:id",
    component: UpdateStudent
  },
  {
    name: 'Testes',
    path: "/testes",
    exact: true,
    component: Quizzes,
    showItem: true
  },
  {
    name: 'Teste',
    path: "/teste/:id",
    component: Quiz
  },
  {
    name: 'Criar Teste',
    path: "/create-teste",
    exact: true,
    component: CreateQuiz,
    showItem: true
  },
  {
    name: 'Atualizar Teste',
    path: "/update-teste/:id",
    component: UpdateQuiz
  }
]
