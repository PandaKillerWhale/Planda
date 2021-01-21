import React, { useState, useEffect } from 'react';
import CreationModal from './CreationModal';
import TaskCategory from './TaskCategory';

/* Title within navbar */
const UserPanel = (props) => {

  const [creationModal, setCreationModal] = useState([]);


  const changeDisplay = (e) => props.setCurrentDisplay(e.target.id.replace('userPanelBtn', ''));

  const appendGroupToState = (group) => {
    props.setUserState({
      ...props.userState,
      groups: props.userState.groups.concat(group.name),
      group_id: props.userState.group_id.concat(group.group_id),
    });
  };
  const addNotebook = (title) => {
    if(props.currentDisplay === props.userState.name) return setCreationModal([]);////// HIDE BUTTON IF THIS IS TRUE
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ notebookName: title }),
    }
    fetch('/api/group/notebook/'+props.userState.group_id[props.userState.groups.indexOf(props.currentDisplay)], postOptions)
    .then ( () => (setCreationModal([]), props.setTaskCategories(taskCategories.concat(title))))
    
  }


  const createGroup = (e) => {
    const newGroupName = window.prompt('New Group Name:');
    if (!newGroupName || !/\w/.test(newGroupName)) return;

    fetch('/api/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ groupName: newGroupName }),
    })
      .then((res) => {
        if (res.status !== 200) throw new Error('create Group: Server answered with error');
        return res;
      })
      .then((res) => res.json())
      .then((newGroup) => appendGroupToState(newGroup))
      .catch((err) => console.error(err));
  };

  const createModal = (type, typePostCallback) => {
    return setCreationModal([<CreationModal type={type} clickFunc={typePostCallback}/>])
  }

  const hideUserPanel = (e) => {
    props.setUserState({ ...props.userState, enabled: false });
  };

  const groupLinks = [];
  for (let i = 0; i < props.userState.groups.length; i++) {
    groupLinks.push(
      <button
        id={`userPanelBtn${props.userState.groups[i]}`}
        className="userPanelLinks"
        href={`/dashboard?${props.userState.groups[i]}`}
        onClick={changeDisplay}
      >
        {props.userState.groups[i]}
      </button>
    );
  }

  return (
    <main>
      <div className="hideUserPanelMask" onClick={hideUserPanel}></div>
      <div className="userPanel">
      {creationModal}
        <button
          href={`/dashboard?${props.userState.name}`}
          className="userPanelLinks"
          id={`userPanelBtn${props.userState.name}`}
          onClick={changeDisplay}
        >
          {props.userState.name}
        </button>
        <h2 className="userpanel-header">Groups</h2>
        <button className="new-group-btn userPanelLinks" onClick={createGroup}>
          New Group +
        </button>
        {groupLinks}
        <button className='userPanelLinks' display={props.userState.groups.includes(props.currentDisplay) ? "none" : "inline"} id='userpanelBtnAddNB' onClick={() => {createModal('notebook', addNotebook)}}>Add New NoteBook to Active Group</button>
      </div>
    </main>
  );
};
export default UserPanel;
