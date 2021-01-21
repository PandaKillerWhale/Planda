import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import UserPanel from './UserPanel.jsx'
import TaskCategory from './TaskCategory.jsx'
import TaskCategorySteps from './TaskCategorySteps.jsx'
import LoginContainer from './LoginContainer';
import ProgressBar from './ProgressBar.jsx';
import CurrentGroupDisplay from './CurrentGroupDisplay.jsx';

const Navbar = () => {

  const [taskCategories, setTaskCategories] = useState([]);
  const [currentTaskCat, toggleCurrentTask] = useState('');
  const [cards, setCards] = useState([]);
  const [userState, setUserState] = useState({ name: '', id: '', groups: [], group_id: [], enabled: false });
  const [currentDisplay, setCurrentDisplay] = useState(userState.name);

  /* on page load, we pull the data for the current Task Cat,  */
  useEffect(() => {
    fetch('/api/user/groups')
      .then(res => res.json())
      .then(data => {
        const newUser = { name: data.username, id: data.id, groups: [], group_id: [] };
        data.userGroups.forEach(element => (newUser.groups.push(element.name), newUser.group_id.push(element.group_id)));
        setUserState(newUser);
      });
  }, []);

  //Pulling Card data based on current displays
  useEffect(() => {
    if (userState.groups.indexOf(currentDisplay) >= 0) {
<<<<<<< HEAD
      fetch('/api/group/cards/' + userState.group_id[userState.groups.indexOf(currentDisplay)])  // "/api/group/cards/""
        .then(res => res.json())
        .then(data => {
          setCards(data);
        });
    } else if (currentDisplay === userState.name) {
      fetch('/api/user/cards/')  // "/api/group/cards/""
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setCards(data);
        });
=======
    fetch('/api/group/cards/'+userState.group_id[userState.groups.indexOf(currentDisplay)]) 
      .then(res => res.json())
      .then(data => {
        setCards(data);
      });
    } else if (currentDisplay === userState.name) {
      fetch('/api/user/cards/')  
      .then(res => res.json())
      .then(data => {
        setCards(data);
      });
>>>>>>> main
    }
  }, [currentDisplay])

  //Create Task Categories based on current Display
  useEffect(() => {
    if (userState.groups.indexOf(currentDisplay) >= 0) {
    fetch('api/group/notebooks/'+userState.group_id[userState.groups.indexOf(currentDisplay)])  
      .then(res => res.json())
      .then(data => {
        const newNotebooks=[];
        data.forEach( notebook => newNotebooks.push(notebook.name));
        setTaskCategories(newNotebooks);
      });
    } else if (currentDisplay === userState.name) {
      setTaskCategories(userState.groups)
    }
  }, [cards])

  const taskChecker = (e) => {
    return toggleCurrentTask(e.target.id);
  }


  const darkLightMode = () => {
    const body = document.body;
    body.classList.toggle("dark-mode")
  }


  const catButtons = [];
  taskCategories.forEach((category, index) => {
    catButtons.push(<div>
      <h1 id={category} onClick={taskChecker}>
        <TaskCategory key={`button${category}${index}`} type={category} />
      </h1>
    </div>)
  });

  const switchUserPanel = () => { return userState.enabled ? setUserState({ ...userState, enabled: false }) : setUserState({ ...userState, enabled: true }) }
  const currentTaskShow = [];
  if (currentTaskCat.length > 1) {
    currentTaskShow.push(<div className="grid-container">
      <TaskCategorySteps key={`Steps${currentTaskCat}`} type={currentTaskCat} cardData={cards} userData={userState} />
    </div>)
  }

  // USER PANEL ENABLER 
  const userPanel = [];
  if (userState.enabled) userPanel.push(<UserPanel key='UserPanel1' userState={userState} setCurrentDisplay={setCurrentDisplay} setUserState={setUserState} />)
  // LOGIN ENABLER
  const login = [];
  if (!userState.name) login.push(<LoginContainer key='LoginContainer1' setUser={setUserState} />)

<<<<<<< HEAD
=======
    // USER PANEL ENABLER 
    const userPanel = [];
    if (userState.enabled) userPanel.push(<UserPanel key='UserPanel1' userState={userState} currentDisplay={currentDisplay} setCurrentDisplay={setCurrentDisplay} taskCategories={taskCategories} setTaskCategories={setTaskCategories} setUserState={setUserState} />)
    // LOGIN ENABLER
    const login = [];
  if (!userState.name) login.push(<LoginContainer key='LoginContainer1' setUser={setUserState}/>)
  
>>>>>>> main
  const getGroupIdFromName = (name) => {
    // if name is not set
    if (!name) return;
    const index = userState.groups.indexOf(name);
    // if name is user name (personal board)
    if (index < 0) return;
    return userState.group_id[index];
  };

  /* PROGRESS BAR FUNCTION */

  /* 2. PROGRESS OVERALL CARDS FUNCTION :: MAIN PROGRESS BAR */
  // const overAllCards = [];
  // const cardsFinished = [];

  // for (let i = 0; i < cards.length; i++) {
  //   overAllCards.push(cards[i]);
  //   if (cards[i].status === 1) {
  //     cardsFinished.push(cards);
  //   }
  // }

  const progressData = [
    { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", barCat: "FrontEnd", completed: 25, status: 0 },
    { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", barCat: "FrontEnd_UX", completed: 55, status: 0 },
    { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", barCat: "BackEnd", completed: 53, status: 1 },
    { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", barCat: "Data_Base", completed: 75, status: 1 },
  ];

  /* 1. PROGRESS BAR FUNCTION :: INDIVIDUAL PROGRESS BAR PER BOARD */
  // const progressBar = [];
  // const boardCards = cards.filter(card => );
  // console.log(`sample cards detail : ${cards[0]}`);

  // progressData.map((item, idx) => {
  //   progressBar.push(
  //     <div className="progressbar">
  //       <ProgressBar key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} barCat={item.barCat} completed={item.completed} />
  //     </div>
  //   )
  // });
  // console.log(`overAllCards numer = ${overAllCards.length}`);
  // console.log(`overAllCards = ${cardsFinished.length}`);
  // /* PROGRESS BAR FUNCTION */

  // GROUP ICON DIVS AND PROGRESSBAR
  return (
    <div>
<<<<<<< HEAD
      <div id='Icons'><img id='theUserIcon' onClick={switchUserPanel} /><img id='DarkLightIcon' onClick={darkLightMode} /></div>
=======
     <div id='Icons'>
       <img  id='theUserIcon' onClick={switchUserPanel} />
        <img id='DarkLightIcon'  onClick={darkLightMode} />
     </div>
>>>>>>> main
      <CurrentGroupDisplay
        name={currentDisplay}
        id={getGroupIdFromName(currentDisplay)}
        setUserState={setUserState}
        userState={userState}
        setCurrentDisplay={setCurrentDisplay}
      />
      {login}
      <div className="container">
        {catButtons}
        {userPanel}
      </div>
      <div className="progressbar">
        {progressData.map((item, idx) => (
          <ProgressBar key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} barCat={item.barCat} completed={item.completed} />
        ))}
      </div>
      {currentTaskShow}
    </div>
  )
}

export default Navbar;
<<<<<<< HEAD

// src='client/assets/light_dark.png'
=======
>>>>>>> main
