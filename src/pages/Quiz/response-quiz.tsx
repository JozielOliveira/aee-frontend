import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLoader } from "components";
import { useGetResponseQuiz, SaveQuiz } from "services";
import { useRouter } from "hooks";

import FormResponse from './form';

export default function QuizPage() {
  const { idTest, idStudent } = useParams();
  const { onLoader } = useLoader();
  const { loading, error, data } = useGetResponseQuiz(idTest, idStudent);
  const { onShowNavbar } = useRouter()

  useEffect(() => {
    onShowNavbar(false)
    onLoader(loading)

    return () => onShowNavbar(true)
  }, [data, loading, onShowNavbar, onLoader])

  if (error) return <p>Error :(</p>;
  if (!data) return null

  return (
    <SaveQuiz>
      <FormResponse data={data} idStudent={idStudent} />
    </SaveQuiz>
  );
}
