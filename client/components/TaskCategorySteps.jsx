import React, { useState, useEffect, Fragment } from 'react';

const TaskCategorySteps = (props) => {
  /* variable and state declaration */

  const createdDivs = [];
  const [Data, setData] = useState(props.cardData.filter( card => card.notebook_name === props.type));
  const [userData, setUserData] = useState([]);

  /*
    * similar to component life cycle method.
    * onload, the page will make a fetch request, and set it as state under appConfigData
  */

  const comments = [];
  const showComments = (e) => {
    comments.push(<div className='CommentDiv' ><div>{Data[e.target.id].comments_json}</div><input type="text"></input></div>)
  }

  /* iterating through the prop.type Data to create the divs */
  for (let i = 0; i < Data.length; i += 1) {
    const resDivs = [];
    if(Data[i]) resDivs.push(<a href={Data[i].resources} target="_blank">Documentation</a>)
    createdDivs.push(
      <div className="cards" key={`cards${Data[i].card_id}`} id={Data[i].card_id}>
        <div className="innerContainer">
          <div className="completedCheckboxParent">
            <label>Complete</label>
            <input
              type="checkbox"
              name={Data[i].status === 2 ? 'true' : 'false'}
            ></input>
          </div>

          <h1 className="innerContainerH1">{Data[i].title}</h1>
          <p>{Data[i].description}</p>
          {resDivs}
          {comments}
          <img
            id={`00000${i}`}
            className="pointer"
            onClick={showComments}
            src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"
          />
        </div>
      </div>
    );
  }
  //iterate through to add in user created data

  const handleSubmit = () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const resources = document.querySelector('#resources').value;
    fetch(`/api/card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        resources,
        status: 0,
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
