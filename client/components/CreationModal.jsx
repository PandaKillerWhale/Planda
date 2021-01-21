import React from 'react';

/* Title within navbar */
const CreationModal = (props) => {

  return (
      <div className="creationModal">
          <label>{`New ${props.type} Creation`}</label><br/>
          <input label={props.type} placeholder={`New ${props.type} name`} onClick={props.clickFunc}></input>
      </div>
  );
}
export default CreationModal;