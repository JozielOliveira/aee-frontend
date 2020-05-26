import React from 'react';

import { Input } from '..';

export const SelectInputType: React.FC<{ type: string, id: string, name: string, [x: string]: string }> = ({ type, id, name }) => {
  const attr = {
    id,
    name,
  }
  switch (type) {
    case 'Texto':
      return <Input type="text" {...attr} />
    case 'Booleano':
      return <Input type="boolean" {...attr} />
    case 'Multipla Escolha':
      return <Input type="options" options={[{ label: 'Select 1' }, { label: 'Select 2' }]} {...attr} />
    case 'Caixa de seleção':
      return <Input type="text" {...attr} />
    default:
      return <>Selecione o tipo de Questão</>
  }
}
