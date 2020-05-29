import React from "react";
import { useParams } from "react-router-dom";
import { DemoNavbar, RenderForm } from "components";
import { useGetQuiz } from "services";

// index page sections
import Hero from "../views/IndexSections/Hero.js";

function FormBuild() {
  const { id } = useParams();
  const { loading, error, data } = useGetQuiz(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>

  return (
    <>
      <DemoNavbar />
      <main>
        <Hero />
        <RenderForm quiz={data.quiz} />} />
      </main>
    </>
  );
}

export default FormBuild;
