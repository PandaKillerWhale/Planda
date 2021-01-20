import React from 'react';

/* Title within navbar */
const UserPanel = (props) => {
  const changeDisplay = (e) => props.setCurrentDisplay(e.target.id.replace('userPanelBtn', ''));
  const groupLinks = [];
  for(let i = 0; i < props.userState.groups.length; i++) {
    groupLinks.push(<button id={`userPanelBtn${props.userState.groups[i]}`} className='userPanelLinks' href={`/dashboard?${props.userState.groups[i]}`} onClick={changeDisplay} >{props.userState.groups[i]}</button> )
  }
  return (
    <main>
      <div className="userPanel">
        <button href={`/dashboard?${props.userState.name}`} className='userPanelLinks' id={`userPanelBtn${props.userState.name}`} onClick={changeDisplay} >{props.userState.name}</button>
        {groupLinks}
      </div>
    </main>
  );
}
export default UserPanel;