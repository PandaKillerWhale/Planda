import React, { useState, useEffect, Fragment } from 'react';

const TaskCategorySteps = (props) => {
  /* variable and state declaration */
  const createdDivs = [];
  const [Data, setData] = useState([]);
  const [userData, setUserData] = useState([]);


  /*
    * similar to component life cycle method.
    * onload, the page will make a fetch request, and set it as state under appConfigData
  */
  useEffect(() => {
    if(props.type==='AppConfig'){
      fetch(`/api/${props.type}`)
        .then((res) => res.json())
        .then(
          (result) => { setData(result) },
          (error) => { console.log(error); }
        );
    }
    else {
      fetch(`/api/${props.type}/${props.currentDisplay}`)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log('result: ', result);
            setData(result[0]);
            setUserData(result[1]);
          },
          (error) => { console.log(error); }
        );
    }
  }, []);

  const comments = [];
  const showComments = (e) => {
    comments.push(<div className='CommentDiv' ><div>{props.cardData[e.target.id]}</div><input type="text"></input></div>)
  }

  /* iterating through the prop.type Data to create the divs */
  for (let i = 0; i < props.cardData.length; i += 1) {
    const resDivs = [];
    if(props.cardData[i]) resDivs.push(<a href={props.cardData[i].resources} target="_blank">Documentation</a>)
    createdDivs.push(
      <div className="cards" key={`cards${props.cardData[i]}`} id={props.cardData[i].id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              type="checkbox"
              name={props.cardData[i].iscompleted ? 'true' : 'false'}
            ></input>
          </div>

          <h1 className="innerContainerH1">{props.cardData[i].title}</h1>
          <p>{props.cardData[i].description}</p>
          {resDivs}
          {comments}
          <img
            id={`00000${i}`}
            class="pointer"
            onClick={showComments}
            src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"
          />
        </div>
      </div>
    );
  }
  //iterate through to add in user created data
  for (let i = 0; i < userData.length; i += 1) {
    createdDivs.push(
      <div className="cards" key={`key${i}`} id={userData[i].id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              className="checkbox"
              type="checkbox"
              name={userData[i].iscompleted ? 'true' : 'false'}
            ></input>
          </div>
          <h1 className="innerContainerH1">{userData[i].title}</h1>
          <p>{userData[i].description}</p>
          <a href={userData[i].resources} target="_blank">
            Documentation
          </a>
          <img
            id="pointer"
            src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"
          />
        </div>
      </div>
    );
  }


  const handleSubmit = () => {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const resources = document.querySelector('#resources').value;
  fetch(`/api/${props.type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      resources,
      iscompleted: false,
      type: `${props.type}`,
      name: props.currentDisplay
    }),
  })
    .then((res) => console.log('res: ', res))
    .catch((error) => console.log('error: ', error));
  location.reload();
  };


  const createNew = [];
  if(props.type!=="AppConfig"){
    createNew.push(<div className="cards">
    <div className="inputForm">
      <h1 className="addYourOwn">Add Your Own Card</h1>
      <input id="title" placeholder="Title"></input>
      <input id="description" placeholder="Description"></input>
      <input id="resources" placeholder="Resources"></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </div>)
  }



  return (
  <Fragment>
    {createdDivs}
    {createNew}
  </Fragment>);
}
export default TaskCategorySteps;
