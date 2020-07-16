import { RouteType } from "hooks";

import Index from "views/Index";
import Landing from "views/examples/Landing.js";
import Profile from "views/examples/Profile.js";

import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Logout from "pages/Auth/Logout";

import CreateUser from "pages/User/create";
import EditUser from "pages/User/update";
import Users from "pages/User/list";

import Quiz from "pages/Quiz/quiz";
import ResponseQuiz from "pages/Quiz/response-quiz";
import Quizzes from "pages/Quiz/list";
import CreateQuiz from "pages/Quiz/create";
import UpdateQuiz from "pages/Quiz/update";

import Student from "pages/Student/student";
import Students from "pages/Student/list";
import CreateStudent from "pages/Student/create";
import UpdateStudent from "pages/Student/update";
import ResumeQuiz from "pages/Student/resume";

export const routes: RouteType[] = [
  {
    name: 'Home',
    path: "/",
    exact: true,
    component: Login
  },
  {
    name: 'Langin Page',
    path: "/landing-page",
    exact: true,
    component: Landing
  },
  {
    name: 'Login',
    path: "/login",
    exact: true,
    component: Login
  },
  {
    name: 'Perfil',
    path: "/profile",
    exact: true,
    component: Profile
  },
  {
    name: 'Registrar',
    path: "/register",
    exact: true,
    component: Register
  },
  {
    name: 'Profissionais',
    path: "/professionals",
    exact: true,
    isPrivate: true,
    isAdmin: true,
    component: Users,
    showItem: true
  },
  {
    name: 'Adicionar profissional',
    path: "/add-professional",
    exact: true,
    isPrivate: true,
    isAdmin: true,
    component: CreateUser,
  },
  {
    name: 'Editar profissional',
    path: "/edit-professional/:id",
    exact: true,
    isPrivate: true,
    isAdmin: true,
    component: EditUser,
  },
  {
    name: 'Estudantes',
    path: "/estudantes",
    exact: true,
    isPrivate: true,
    component: Students,
    showItem: true
  },
  {
    name: 'Estudante',
    path: "/estudante/:id",
    exact: true,
    isPrivate: true,
    component: Student
  },
  {
    name: 'Revisão',
    path: "/estudante/:idStudent/teste/:idTest",
    isPrivate: true,
    component: ResumeQuiz
  },
  {
    name: 'Adicionar Estudante',
    path: "/add-estudante",
    exact: true,
    isPrivate: true,
    component: CreateStudent,
  },
  {
    name: 'Editar Estudante',
    path: "/edit-estudante/:id",
    isPrivate: true,
    component: UpdateStudent
  },
  {
    name: 'Testes',
    path: "/testes",
    exact: true,
    isPrivate: true,
    component: Quizzes,
    showItem: true
  },
  {
    name: 'Teste',
    path: "/teste/:id",
    exact: true,
    isPrivate: true,
    component: Quiz
  },
  {
    name: 'Teste',
    path: "/teste/:idTest/estudante/:idStudent",
    isPrivate: true,
    exact: true,
    component: ResponseQuiz
  },
  {
    name: 'Adicionar Teste',
    path: "/add-teste",
    exact: true,
    isPrivate: true,
    isAdmin: true,
    component: CreateQuiz,
  },
  {
    name: 'Editar Teste',
    path: "/edit-teste/:id",
    isPrivate: true,
    isAdmin: true,
    component: UpdateQuiz
  },
  {
    name: 'Logout',
    path: "/logout",
    isPrivate: true,
    showItem: true,
    component: Logout
  }
]
