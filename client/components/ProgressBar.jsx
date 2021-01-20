import React from 'react';

 

const ProgressBar = (props) => {
  const { bgcolor, barCat, completed } = props;
  // styling will move to style.css when feature finish mockup
  const barContainerStyles = {
    left: 15,
    height: 15,
    width: '85%',
    backgroundColor: "#e0e0de",
    opacity: 1,
    borderRadius: 5,
    margin: 5
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 2,
    color: 'darkgrey',
    fontWeight: 'bold'
  }

  return (
    <div style={barContainerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${barCat} ${completed}%`}</span>
      </div>
    </div>
  );
};

// export default ProgressBar; 
export default ProgressBar; 

/* const progressData = [
  { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", barCat: "FrontEnd_I", completed: 33 },
  { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", barCat: "FrontEnd_II", completed: 35 },
  { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", barCat: "BackEnd_I", completed: 53 },
  { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", barCat: "BackEnd_II", completed: 75 },
]; 

 <div className="progressbar">
        {progressData.map((item, idx) => (
          <ProgressBar key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} barCat={item.barCat} completed={item.completed} />
        ))}
  </div>
*/