import React from 'react';
import '../styles/index.css';

const Typewriter = () => {
  document.addEventListener('DOMContentLoaded', function (event) {
    const dataText = [
      "Panda Killer Whale",
      "Panda Killer Whale",
      "Panda Killer Whale",
    ];
    
    //typeWriter animation function 
    const typeWriter = (text, i, fnCallback) => {
      if (i < text.length) {
        document.querySelector('#divTitle').innerHTML =
          text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        // how fast you want the text to be written across the screen
        setTimeout(function () {
          typeWriter(text, i + 1, fnCallback);
        }, 100);
      } else if (typeof fnCallback == 'function') {
        // how long it'll take for the next type writer effect to kick in
        setTimeout(fnCallback, 10000);
      }
    }
    // start a typewriter animation for a text in the dataText array
    const StartTextAnimation = (i) => {
      if (dataText[i] === undefined) {
        setTimeout(function () {
          StartTextAnimation(0);
        }, 10000);
      } else if (i < dataText[i].length) {
        typeWriter(dataText[i], 0, () => {
          StartTextAnimation(i + 1);
        });
      }
    }
    StartTextAnimation(0);
  });

  return <div></div>;
};

export default Typewriter;
