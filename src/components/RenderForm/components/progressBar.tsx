import React from 'react'
import { Container, Progress } from "reactstrap"

export const ProgressBar = (props: { value: number }) => 
  <Container>
      <div className="progress-info">
        <div className="progress-percentage">
          <span> {props.value} %</span>
        </div>
      </div>
      <Progress max="100" value={props.value} />
  </Container>
