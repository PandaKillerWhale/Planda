import React, { useState, useEffect } from 'react';
import CreationModal from './CreationModal';

/* Title within navbar */
const UserPanel = (props) => {

  const [creationModal, setCreationModal] = useState([]);


  const changeDisplay = (e) => props.setCurrentDisplay(e.target.id.replace('userPanelBtn', ''));
  const groupLinks = [];
  for(let i = 0; i < props.userState.groups.length; i++) {
    groupLinks.push(<button id={`userPanelBtn${props.userState.groups[i]}`} className='userPanelLinks'  onClick={changeDisplay} >{props.userState.groups[i]}</button> )
  }

  const addNotebook = () => {
    if(props.currentDisplay === props.userState) return ////// HIDE BUTTON IF THIS IS TRUE
    fetch('api/group/notebook/'+props.userState.group_id[props.userState.group.indexOf(props.currentDisplay)])
      .then(data => data.json())
      .then(parsed = props.setTaskCategories(props.taskCategories.concat(parsed)))
  }

  const createModal = (type, typePostCallback) => {
    return setCreationModal([<CreationModal type={type} clickFunc={typePostCallback}/>])
  }
  
  return (
    <main>
      <div className="userPanel">
        {creationModal}
        <button  className='userPanelLinks' id={`userPanelBtn${props.userState.name}`} onClick={changeDisplay} >{props.userState.name}</button>
        {groupLinks}
        <button className='userPanelLinks' id='userpanelBtnAddNB' onClick={() => createModal('notebook', addNotebook)}>Add New NoteBook to Active Group</button>
      </div>
    </main>
  );
}
export default UserPanel;