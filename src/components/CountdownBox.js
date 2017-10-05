import React from 'react';

const CountdownBox = (props) => (
  <div className='countdown-box-wrapper'>
    <div className='countdown-unit-title'>
      { props.unit }
    </div>
    <div className='countdown-number-box'>
      { props.value }
    </div> 
  </div>
);

export default CountdownBox;
