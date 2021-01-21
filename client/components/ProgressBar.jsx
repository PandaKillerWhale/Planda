import React from 'react';

const ProgressBar = (props) => {
  const { bgcolor, barCat, completed } = props;
  // styling will move to style.css when feature finish mockup
 
  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    opacity: 1,
    borderRadius: 'inherit',
    textAlign: 'right'
  }
 
  // inline styling for progress bar
 /*  return (
    <div className="barContainerStyles">
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${barCat} ${completed}%`}</span>
      </div>
    </div>
  ); */

  return (
    <div className="barContainerStyles">
      <div style={fillerStyles}>
        <span className="labelStyles">{`${barCat} ${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar; 

 