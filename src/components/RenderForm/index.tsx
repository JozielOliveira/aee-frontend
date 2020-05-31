import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Title } from "./components";
import { ProgressBar } from "..";
import { Steps } from "./steps";
import { QuizType, StepResponseType } from "../../types";

const submitStep = (params: StepResponseType) => ({ data: params });
// const submitForm = params => ({ data: params })

export interface RenderFormProps {
  quiz: QuizType;
}

export const RenderForm = ({ quiz }: RenderFormProps) => {
  const [step, setStep] = useState(1);
  const steps = quiz.steps.filter(step => step.questions.length > 0)

  const quantSteps = () => step * (100 / steps.length);

  const handleSubmit = async (step_id: string, params: any) => {
    const response = await submitStep({
      step_id,
      quiz_id: quiz.id,
      response: params,
    });

    // if (steps.length === step)
    //   const response = await submitForm()

    console.log(response.data);

    setStep(step + 1);
  };

  return (
    <Container className="mb-5">
      <Title value={quiz.title} />
      {steps.length === 0 && <ProgressBar value={quantSteps()} />}
      <Card className="shadow">
        <CardBody>
          {steps[step - 1] && (
            <Steps onSubmit={handleSubmit} {...steps[step - 1]} />
          )}
        </CardBody>
      </Card>
    </Container>
  );
};
