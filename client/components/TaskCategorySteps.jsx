import React, { useState, useEffect, Fragment } from 'react';

const TaskCategorySteps = (props) => {
  /* variable and state declaration */

  const createdDivs = [];
  const [Data, setData] = useState(props.userData.groups.includes(props.type) ? props.cardData.filter( card => card.group_name === props.type) : props.cardData.filter( card => card.notebook_name === props.type));
  const [notebookData, setNotebookData] = useState(() => Data[0] ? [Data[0].notebook_name, Data[0].notebook_id] : null);

  const comments = [];
  const showComments = (e) => {
    comments.push(<div className='CommentDiv' ><div>{Data[e.target.id].comments_json}</div><input type="text"></input></div>)
  }

  const deleteCard = (e) => {
    console.log('trying to delete')
    const deleteOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        card_id:e.target.id
      })
    }
    fetch('/api/card/', deleteOptions)
    .then( response => response.json())
    .then( parsed =>  setData(Data.filter(element => element.card_id!== parsed.card_id)))
  }

  /* iterating through the prop.type Data to create the divs */
  for (let i = 0; i < Data.length; i += 1) {
    const resDivs = [];
    if(Data[i]) resDivs.push(<a href={Data[i].resources} target="_blank">Documentation</a>)
    createdDivs.push(
      <div className="cards" key={`cards${Data[i].card_id}`} id={Data[i].card_id}>
        <div className="innerContainer">
          <img id={Data[i].card_id} className='deleteCard' onClick={deleteCard} src='client/assets/delete.png' />
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

  const handleSubmit = () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const resources = document.querySelector('#resources').value;
    if (!title || !description || !resources ) {
      document.querySelector('#title').classList.toggle('error');
      document.querySelector('#description').classList.toggle('error');
      document.querySelector('#resources').classList.toggle('error');
      return console.log('error')
    }
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        resources,
        status: 0,
        notebook_id: notebookData[1]
      })
    };
    document.querySelector('#title').value=null;
    document.querySelector('#description').value=null;
    document.querySelector('#resources').value=null;
    fetch(`/api/card`, postOptions)
      .then( res => res.json())
      .then( parsed => setData(Data.concat([parsed])))
      .catch((error) => console.log('error: ', error));
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
