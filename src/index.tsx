import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Form from "pages/form";
import BuildForm from "pages/buildForm";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
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
          path="/form"
          exact
          render={(props: any) => <Form {...props} />}
        />
        <Route
          path="/build"
          exact
          render={(props: any) => <BuildForm {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
