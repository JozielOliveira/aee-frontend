import React from 'react';

import Logo from "../../assets/img/brand/logo.png"

export const Icon: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={Logo} width="200" style={{ position: 'relative', alignSelf: "center" }}></img>
    </div>
  );
}
