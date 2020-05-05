import React, { useState } from 'react'
import { Container, Card, CardBody } from "reactstrap"
import { Title, ProgressBar } from './components'
import { Steps } from './steps'
import { QuizType, StepResponseType } from '../../types'

const submitStep = (params: StepResponseType) => ({ data: params })
// const submitForm = params => ({ data: params })

interface RenderFormProps {
  quiz: QuizType
}

export default ({ quiz }: RenderFormProps) => {
  const [step, setStep] = useState(1)

  const quantSteps = () => step * (100 / quiz.steps.length) 

  const handleSubmit = async (step_id: string, params: any) => {    
    const response = await submitStep({
      step_id,
      quiz_id: quiz.id,
      response: params
    })

    // if (quiz.steps.length === step)
    //   const response = await submitForm()
  
    console.log(response.data)

    setStep(step+1)
  }

  return (
    <Container className="mb-5">
      <Title value={quiz.title}/>
      { quiz.steps.length === 0 && 
        <ProgressBar value={quantSteps()} />
      }
      <Card className="shadow">
        <CardBody>
          { quiz.steps[step-1] &&
            <Steps 
              onSubmit={handleSubmit} 
              {...quiz.steps[step-1]} 
            />
          }
        </CardBody>
      </Card>
    </Container>
  )
}