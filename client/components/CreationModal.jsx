import React from 'react';

/* Title within navbar */
const CreationModal = (props) => {

  return (
      <div className="creationModal">
          <label>{`New ${props.type} Creation`}</label><br/>
          <input label={props.type} id='creationModalInput' placeholder={`New ${props.type} name`}></input><button onClick={() => props.clickFunc(document.querySelector('#creationModalInput').value)} >Add {props.type}</button>
      </div>
  );
}
export default CreationModal;