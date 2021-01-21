import React from 'react';

/* Title within navbar */
const UserPanel = (props) => {
  const changeDisplay = (e) => props.setCurrentDisplay(e.target.id.replace('userPanelBtn', ''));

  const appendGroupToState = (group) => {
    console.log(props.setUserState);
    props.setUserState({
      ...props.userState,
      groups: props.userState.groups.concat(group.name),
      group_id: props.userState.group_id.concat(group.group_id),
    });
  };

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
      <div className="userPanel">
        <button
          href={`/dashboard?${props.userState.name}`}
          className="userPanelLinks"
          id={`userPanelBtn${props.userState.name}`}
          onClick={changeDisplay}
        >
          {props.userState.name}
        </button>
        {groupLinks}
        <button onClick={createGroup}>New Group</button>
      </div>
    </main>
  );
};
export default UserPanel;
