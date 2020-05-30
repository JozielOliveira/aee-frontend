import React from 'react';

import { Input } from '..';
import { Option } from 'components/Input';

export const SelectInputType: React.FC<{
  type: 'Texto' | 'Booleano' | 'Multipla Escolha' | 'Caixa de seleção' | 'Numero';
  id: string;
  name: string;
  label?: string;
  options?: Option[];
  step_id?: string;
  question_id?: number;
  disabled?: boolean;
}> = ({ type, ...props }) => {

  switch (type) {
    case 'Texto':
      return <Input type="text" {...props} />
    case 'Numero':
      return <Input type="number" {...props} />
    case 'Booleano':
      return <Input type="boolean" {...props} />
    case 'Multipla Escolha':
      return <Input todoList={true} type="options" {...props} />
    case 'Caixa de seleção':
      return <Input todoList={true} type="checklist" {...props} />
    default:
      return <>Selecione o tipo de Questão</>
  }
}
