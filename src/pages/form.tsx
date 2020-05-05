import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// core components
import { DemoNavbar, RenderForm } from "components";

// index page sections
import Hero from "../views/IndexSections/Hero.js";

const QUIZ = gql`
  {
    quiz(id: 1) {
      id
      title
      steps {
        id
        questions {
          id
          name
          type
          label
          placeholder
          description
        }
      }
    }
  }
`;

function FormBuild() {
  const { loading, error, data } = useQuery(QUIZ);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <>
      <DemoNavbar />
      <main>
        <Hero />
        <RenderForm quiz={data.quiz} />
      </main>
    </>
  );
}

export default FormBuild;
