import React from 'react';

export const Title: React.FC<{ value: string }> = ({ value }) => {
  return (
    <h1 className="h3 text-lead font-weight-bold text-center mb-5">
      {value}
    </h1>
  );
}
