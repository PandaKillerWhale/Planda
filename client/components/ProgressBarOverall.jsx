import React from 'react';

const ProgressBarOverall = (props) => {
  const { bgcolor, allPercentage } = props;
  // styling will move to style.css when feature finish mockup

  const fillerStyles = {
    height: '100%',
    width: `${allPercentage}%`,
    backgroundColor: bgcolor,
    opacity: 1,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div className="barContainerStyles">
      <div style={fillerStyles}>
        <span className="labelStyles">{`Overall Progress ${allPercentage}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBarOverall;

