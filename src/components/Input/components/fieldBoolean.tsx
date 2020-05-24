import React from "react";
import { FieldOptions } from "./fieldOptions";
import { FieldFormki } from "..";

export const FieldBoolean = (props: FieldFormki) => {
  return (
    <FieldOptions
      {...props}
      options={[
        { label: 'Sim' },
        { label: 'Não' }
      ]}
    />
  )
}

// const FieldBoolean = ({ field, form, ...props }: FieldFormki) => {
//   const hasError = Boolean(form.errors[field.name]);

//   return (
//     <FormGroup hasError={hasError} name={field.name} icon={false}>
//       <label className="custom-toggle">
//         <input
//           type="checkbox"
//           checked={Boolean(field.value)}
//           {...field}
//           {...props}
//         />
//         <span className="custom-toggle-slider rounded-circle" />
//       </label>
//     </FormGroup>
//   );
// };
