import React, { useState } from 'react';

const Parent = () => {
  const [colr, setColr] = useState('blue');
  return (
    <div>
      <div
        style={{
          height: '250px',
          width: '250px',
          margin: '10%',
          border: '1px solid black',
          backgroundColor: `${colr}`,
          borderRadius: '5%',
        }}
      ></div>
      <textarea
        onChange={(e) => {
          setColr(e.target.value);
        }}
        placeholder="Enter Your Fav color"
      />
    </div>
  );
};

export default Parent;
