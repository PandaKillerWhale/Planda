import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import UserPanel from './UserPanel.jsx'
import TaskCategory from './TaskCategory.jsx'
import TaskCategorySteps from './TaskCategorySteps.jsx'
import LoginContainer from './LoginContainer';
import ProgressBar from './ProgressBar.jsx';
import ProgressBarOverall from './ProgressBarOverall.jsx';
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
      fetch('/api/group/cards/' + userState.group_id[userState.groups.indexOf(currentDisplay)])
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
    }
    console.log(`cards 1: ${cards[1]}`);
    console.log(`cards : ${cards.group_id}`);
  }, [currentDisplay])

  //Create Task Categories based on current Display
  useEffect(() => {
    if (userState.groups.indexOf(currentDisplay) >= 0) {
      fetch('api/group/notebooks/' + userState.group_id[userState.groups.indexOf(currentDisplay)])
        .then(res => res.json())
        .then(data => {
          const newNotebooks = [];
          data.forEach(notebook => newNotebooks.push(notebook.name));
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
  if (userState.enabled) userPanel.push(<UserPanel key='UserPanel1' userState={userState} currentDisplay={currentDisplay} setCurrentDisplay={setCurrentDisplay} taskCategories={taskCategories} setTaskCategories={setTaskCategories} setUserState={setUserState} />)
  // LOGIN ENABLER
  const login = [];
  if (!userState.name) login.push(<LoginContainer key='LoginContainer1' setUser={setUserState} />)

  const getGroupIdFromName = (name) => {
    // if name is not set
    if (!name) return;
    const index = userState.groups.indexOf(name);
    // if name is user name (personal board)
    if (index < 0) return;
    return userState.group_id[index];
  };

  /***************  PROGRESS BAR FUNCTION *********************/

  let cardsUnfiltered = [
    { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", taskCategories: "FrontEnd", completed: 25, status: 0 },
    { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", taskCategories: "FrontEnd", completed: 25, status: 1 },
    { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", taskCategories: "FrontEnd", completed: 25, status: 1 },
    { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", taskCategories: "FrontEnd", completed: 25, status: 1 },
    { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: "FrontEnd_UX", completed: 55, status: 0 },
    { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: "FrontEnd_UX", completed: 55, status: 1 },
    { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: "FrontEnd_UX", completed: 55, status: 0 },
    { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: "FrontEnd_UX", completed: 55, status: 0 },
    { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", taskCategories: "BackEnd", completed: 53, status: 1 },
    { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", taskCategories: "BackEnd", completed: 53, status: 1 },
    { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", taskCategories: "BackEnd", completed: 53, status: 1 },
    { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", taskCategories: "BackEnd", completed: 53, status: 1 },
    { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", taskCategories: "Data_Base", completed: 75, status: 0 },
    { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", taskCategories: "Data_Base", completed: 75, status: 0 },
    { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", taskCategories: "Data_Base", completed: 75, status: 1 },
    { backgroundColor: "#D0F5F6", bgcolor: "#90D14F", taskCategories: "Data_Base", completed: 75, status: 1 },
  ];

  // /* CALCULATE CARDS IN A GROUP FINISHED PERCENTAGE */

  // const cardsByGroup = cards.filter(card => card.notebook_name === "AppConfig");
  // const cardsGroupFinished = cardsUnfiltered.filter(card => card.barCat === "FrontEnd" && cards.status === 1);
  // const cardsGroupPercentage = Math.floor(cardsGroupFinished / cardsByGroup * 100);

  // console.log(`cards: ${cards} ${cards.length}`);
  // console.log('card0', cards[0])
  // console.log(`taskCategories: ${taskCategories}`);
  // console.log(`cardsByGroup: ${cardsByGroup}`);

  const progressByGroup = [];
  const progressOverall = [];
  try {
    const cardsOnCurrGroupNotebooks = cards.filter(c => taskCategories.includes(c.notebook_name));
    // console.log('c', cardsOnCurrGroupNotebooks)
    const cardsPerNotebook = cardsOnCurrGroupNotebooks.reduce((acc, c) => {
      if (!c) return acc
      if (!acc[c.notebook_name]) acc[c.notebook_name] = []
      acc[c.notebook_name].push(c)
      return acc
    }, {})
    // console.log('cp', cardsPerNotebook)
    const notebookCompletionPercentage = Object.entries(cardsPerNotebook).map(([notebookName, nCards]) => {
      const finished = nCards.filter(c => c.status === 1).length
      const percentage = nCards.length !== 0 ? Math.round(finished / nCards.length * 100) : 0
      return { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: notebookName, cardsGroupPercentage: percentage, }
    })
    // ALL NOTEBOOK COMPLETMENT PERCENTAGE
    const finished = cards.filter(c => c.status === 1).length;
    const percentage = cards.length !== 0 ? Math.round(finished / cards.length * 100) : 0;
    const allNotebookCompletionPercentage = { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", allPercentage: percentage, }

    // console.log(notebookCompletionPercentage)
    // console.log(`allNotebookCompletionPercentage, ${allNotebookCompletionPercentage}`)
    const progressDataModel = [
      { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: "FrontEnd", cardsGroupPercentage: 25, },
      { backgroundColor: "#FFFDDA", bgcolor: "#90D14F", taskCategories: "FrontEnd_UX", cardsGroupPercentage: 55 },
      { backgroundColor: "#EAF6DC", bgcolor: "#90D14F", taskCategories: "BackEnd", cardsGroupPercentage: 53 },
      // { backgroundColor: "#FDDAD3", bgcolor: "#90D14F", taskCategories: "FrontEnd", cardsGroupPercentage: 21 },
    ];

    notebookCompletionPercentage.map((item, idx) => {
      progressByGroup.push(
        <ProgressBar key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} taskCategories={item.taskCategories} completed={item.cardsGroupPercentage} />
      )
    });

    /* ProgressOverall Bar */

    [allNotebookCompletionPercentage].map((item, idx) => {
      progressOverall.push(
        <ProgressBarOverall key={idx} backgroundColor={item.backgroundColor} bgcolor={item.bgcolor} allPercentage={item.allPercentage} />
      )
    });
    // console.log('all good')
  } catch (err) { console.log('no cards yet', err) }


  return (
    <div>
      <div id='Icons'>
        <img id='theUserIcon' onClick={switchUserPanel} />
        <img id='DarkLightIcon' onClick={darkLightMode} />
      </div>
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
        {progressByGroup}
      </div>
      <div className="progressOverall">
        {progressOverall}
      </div>
      {currentTaskShow}
    </div>
  )
}

export default Navbar;