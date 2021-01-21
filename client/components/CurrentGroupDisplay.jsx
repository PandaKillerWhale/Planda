import React from 'react';

const CurrentGroupDisplay = ({ name, id, setUserState, userState, setCurrentDisplay }) => {
  name = name || 'Personal';

  const deleteGroup = () => {
    fetch(`/api/group/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })
      .then((res) => {
        if (res.status !== 200) throw new Error('server failed to delete group');
        return res
      })
      .then((res) => res.json())
      .then((removedGroup) => {
        const removedIndex = userState.group_id.indexOf(removedGroup.group_id)
        setUserState({
          ...userState,
          groups: userState.groups.filter((_,i) => i !== removedIndex),
          group_id: userState.group_id.filter((_,i) => i !== removedIndex)
        })
        setCurrentDisplay(userState.name)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="welcome">
      {name}
      {id ? <button onClick={deleteGroup}>X</button> : null}
    </div>
  );
};

export default CurrentGroupDisplay;
