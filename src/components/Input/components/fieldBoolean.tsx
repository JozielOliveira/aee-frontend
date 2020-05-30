import React from "react";
import { FieldOptions } from "./fieldOptions";
import { FieldFormki } from "..";

export const FieldBoolean = (props: FieldFormki) => {
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
