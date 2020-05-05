import React from 'react'

export const Label = (props: { value: string }) =>
  <div className="mb-3">
    <small className="text-uppercase font-weight-bold">
      {props.value}
    </small>
  </div>
