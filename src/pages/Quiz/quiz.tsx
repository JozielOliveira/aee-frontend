import React from "react";
import { useParams } from "react-router-dom";
import { RenderForm } from "components";
import { useGetQuiz } from "services";

export default function QuizPage() {
  const { id } = useParams();
  const { loading, error, data } = useGetQuiz(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>

  return (
    <main>
      <RenderForm quiz={data.quiz} />
    </main>
  );
}
