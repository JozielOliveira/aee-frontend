import React from 'react';
import { Nav, NavLink } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import './styles.css'

export const Fab: React.FC<{ route: string }> = ({ route }) => {
  const { push } = useHistory();

  return (
    <Nav className="nav-pills-circle" pills>

      <NavLink
        className='rounded-circle active'
        onClick={e => push(route)}
      >
        <span className="nav-link-icon d-block">
          <i className="ni ni-fat-add" />
        </span>
      </NavLink>
    </Nav>
  );
}
