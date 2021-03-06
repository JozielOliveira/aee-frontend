import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLoader } from "components";
import { useGetQuiz } from "services";
import { useRouter } from "hooks";

import FormResponse from './form';

export default function QuizPage() {
  const { id } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetQuiz(id);
  const { onShowNavbar } = useRouter()

  useEffect(() => {
    onShowNavbar(false)
    onLoader(loading)

    return () => onShowNavbar(true)
  }, [data, loading, onShowNavbar, onLoader])

  if (error) return <p>Error :(</p>;
  if (!data) return null


  return (
    <main>
      <FormResponse data={data} />
    </main>
  );
}
