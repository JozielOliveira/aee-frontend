import React from 'react'
import ReactDatetime from 'react-datetime'

import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from 'reactstrap'

export const Datepicker = () => {
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
            placeholder: 'Date Picker Here'
          }}
          timeFormat={false}
        />
      </InputGroup>
    </FormGroup>
  )
}

export default Datepicker
