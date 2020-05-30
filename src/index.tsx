import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "services";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Quiz from "pages/Quiz/quiz";
import Quizzes from "pages/Quiz/list";
import CreateQuiz from "pages/Quiz/create";
import UpdateQuiz from "pages/Quiz/update";
import { Header } from "components";

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <div style={{ marginTop: 100 }}></div>
      <Switch>
        <Route path="/" exact render={(props: any) => <Index {...props} />} />
        <Route
          path="/landing-page"
          exact
          render={(props: any) => <Landing {...props} />}
        />
        <Route
          path="/login-page"
          exact
          render={(props: any) => <Login {...props} />}
        />
        <Route
          path="/profile-page"
          exact
          render={(props: any) => <Profile {...props} />}
        />
        <Route
          path="/register-page"
          exact
          render={(props: any) => <Register {...props} />}
        />
        <Route
          path="/quiz"
          exact={true}
          render={(props: any) => <Quizzes {...props} />}
        />
        <Route
          path="/quiz/:id"
          render={(props: any) => <Quiz {...props} />}
        />
        <Route
          path="/create-quiz"
          exact
          render={(props: any) => <CreateQuiz {...props} />}
        />
        <Route
          path="/update-quiz/:id"
          render={(props: any) => <UpdateQuiz {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
