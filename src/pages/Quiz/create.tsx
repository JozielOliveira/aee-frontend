import React from "react";
import { BuilderQuiz } from "components";
import { SaveQuiz } from "services";

export default function CreateQuizPage() {
  return (
    <SaveQuiz>
      <BuilderQuiz />
    </SaveQuiz>
  );
}
