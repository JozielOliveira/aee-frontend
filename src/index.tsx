import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "services";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import { Router } from "hooks";
import { routes } from "./routes";

import { Header, Alert, ModalProvider, LoaderProvider } from "components";

const App = () => (
  <ApolloProvider client={client}>
    <LoaderProvider>
      <ModalProvider>
        <Alert>
          <Router brand='AEE' routes={routes} navbar={Header} />
        </Alert>
      </ModalProvider>
    </LoaderProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
