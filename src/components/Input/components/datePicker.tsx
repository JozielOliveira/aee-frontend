import React from 'react'
import ReactDatetime from 'react-datetime'

import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap'

export const Datepicker = ({ hasError, register, ...props }: any) => {
  return (
    <FormGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-calendar-grid-58" />
          </InputGroupText>
        </InputGroupAddon>
        <ReactDatetime
          inputProps={{
            ref: register(),
            // ...(hasError && { className: "is-invalid" }),
            autocomplete: "off",
            ...props
          }}
          timeFormat={false}

        />
      </InputGroup>
    </FormGroup>
  )
}

export default Datepicker
