import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { ProgressBar } from "..";
import { Steps } from "./steps";
import { QuizType, StepResponseType } from "../../types";
import { Resume } from "./resume";

export interface RenderFormProps {
  quiz: QuizType;
  onSubmit: (params: StepResponseType) => void;
}

export const RenderForm = ({ quiz, onSubmit }: RenderFormProps) => {
  const [step, setStep] = useState(0);
  const steps = quiz.steps.filter(step => step.questions.length > 0)

  const quantSteps = (): string => String(step * (100 / steps.length));

  const handleSubmit = async (step_id: string, params: any) => {
    await onSubmit({
      step_id,
      quiz_id: quiz.id,
      response: params,
    });

    setStep(step + 1);
  };

  return (
    <Container className="mb-5">
      {steps.length !== 0 && <ProgressBar value={parseInt(quantSteps())} />}
      <Card className="shadow">
        <CardBody>
          {steps[step] ? (
            <Steps onSubmit={handleSubmit} {...steps[step]} />
          ) :
            <Resume title="Concluído" />
          }
        </CardBody>
      </Card>
    </Container>
  );
};
