import React from "react";
import { BuilderQuiz } from "components";
import { CreateQuiz } from "services";

export default function BuildFormConect() {
  return (
    <CreateQuiz>
      <BuilderQuiz />
    </CreateQuiz>
  );
}
