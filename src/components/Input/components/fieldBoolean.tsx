import React from "react";
import { FieldOptions } from "./fieldOptions";

export const FieldBoolean = (props: any) => {
  return (
    <FieldOptions
      {...props}
      type='radio'
      options={[
        { label: 'Sim' },
        { label: 'Não' }
      ]}
    />
  )
}
