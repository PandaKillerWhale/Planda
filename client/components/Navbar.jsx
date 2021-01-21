import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import TaskCategory from './TaskCategory.jsx';
import TaskCategorySteps from './TaskCategorySteps.jsx';
import ProgressBar from './ProgressBar.jsx';

const progressData = [
  { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", barCat: "FrontEnd", completed: 25,  },
  { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", barCat: "FrontEnd_UX", completed: 55 },
  { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", barCat: "BackEnd", completed: 53 },
  { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", barCat: "Data_Base", completed: 75 },
];

const Navbar = () => {
  const [taskCategories, setTaskCategories] = useState(['FrontEnd', 'FrontEnd_UX', 'BackEnd', 'Data_Base', ]);
  const [currentTaskCat, toggleCurrentTask] = useState('')
  const [cookieState, setCookieState] = useState('');

  
  /* on page load, we create a cookie with the users name that stays persistent and use it to check against backend */
  useEffect(() => {
    fetch('/api/getCookie')
      .then(res => res.json())
      .then(data => setCookieState(data.username));
  }, []);

  const taskChecker = (e) => {
    console.log(e.target, 'maybe?')
    toggleCurrentTask(e.target.id)
  }
  /*
    * cookieState is the username which is eventually passed down
    * stays persistent so the frontend can keep track of the current logged in user
  */
  const catButtons = [];
  taskCategories.forEach((category, index) => {
    catButtons.push(<div>
      <h1 id={category} onClick={taskChecker}>
        <TaskCategory key={`button${category}${index}`} type={category} />
      </h1>
    </div>)
  });
  const currentTaskShow = [];
  if (currentTaskCat.length > 1) {
    currentTaskShow.push(<div className="grid-container">
        <TaskCategorySteps key={`Steps${currentTaskCat}`} cookieState={cookieState} type={currentTaskCat}/>
    </div>)
  }

  return (
    <div>
      <div className="welcome">Welcome, {cookieState}</div>
      <div className="container">
        {catButtons}
      </div>
      <div className="progressbar">
        {progressData.map((item, idx) => (
          <ProgressBar key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} barCat={item.barCat} completed={item.completed} />
        ))}
      <div className="progressbarOverall">
        {progressData.map((item, idx) => (
          <ProgressBar key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} barCat={item.barCat} completed={item.completed} />
        ))}
      </div>
        {currentTaskShow}
    </div>
  )
}

export default Navbar;
