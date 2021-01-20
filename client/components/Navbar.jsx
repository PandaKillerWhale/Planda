import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import UserPanel from './UserPanel.jsx'
import TaskCategory from './TaskCategory.jsx'
import TaskCategorySteps from './TaskCategorySteps.jsx'
import LoginContainer from './LoginContainer';

const Navbar = () => {

  const [taskCategories, setTaskCategories] = useState(['AppConfig', 'Webpack', 'Backend', 'Frontend']);
  const [currentTaskCat, toggleCurrentTask] = useState('');
  const [cards, setCards] = useState([]);
  const [userState, setUserState] = useState({name:'', groups:['Codesmith', 'PandaKillerWhale'], enabled:false});
  const [currentDisplay, setCurrentDisplay] = useState(userState.name);

  /* on page load, we pull the data for the current Task Cat,  */
  useEffect(() => {
    fetch(`/api/getCards/${currentTaskCat}`)
      .then(res => res.json())
      .then(data => setCards(data));
  }, [currentTaskCat]);

  const taskChecker = (e) => {
    return toggleCurrentTask(e.target.id);
  }

  
  const darkLightMode = () => {
    const body = document.body;
    body.classList.toggle("dark-mode")
  }
  /*
    * cookieState is the username which is eventually passed down
    * stays persistent so the frontend can keep track of the current logged in user
  */
  const catButtons = [];
  taskCategories.forEach((category, index) => {
    catButtons.push(<div>
      <h1 id={category} onClick={taskChecker}>
        <TaskCategory key={`button${category}${index}`} type={category} setCardData={setCards}/>
      </h1>
    </div>)
  });

  const switchUserPanel = () => {return userState.enabled ? setUserState({...userState, enabled: false}) : setUserState({...userState, enabled: true})}
  const currentTaskShow = [];
    if (currentTaskCat.length > 1) {
      currentTaskShow.push(<div className="grid-container">
        <TaskCategorySteps key={`Steps${currentTaskCat}`} currentDisplay={currentDisplay} type={currentTaskCat} cardData={cards}/>
      </div>)
    }

    // USER PANEL ENABLER 
    const userPanel = [];
    if (userState.enabled) userPanel.push(<UserPanel userState={userState} setCurrentDisplay={setCurrentDisplay}/>)
    // LOGIN ENABLER
    const login = [];
    if (!userState.name) login.push(<LoginContainer setUser={setUserState}/>)

  return (
    <div>
     <div id='Icons'><img  id='theUserIcon' onClick={switchUserPanel} /><img id='DarkLightIcon'  onClick={darkLightMode} /></div>
      <div className="welcome">{currentDisplay}</div>
      {login}
      <div className="container">
        {catButtons}
        {userPanel}
      </div>
        {currentTaskShow}
    </div>
  )
}


export default Navbar;


// src='client/assets/light_dark.png'