import "./Color.css";
import { useState } from "react";

/* Each color card displays: siehe dafür colors.js
hex value of the color
the role of the color
the color itself in the background color of the element
the font in the respective contrastText color */

export default function Color({ color, onDeleteColor }) {
  /* The card that the user wants to delete shows a confirmation message.
   The state is located in Color because the confirmation is only needed
   for one card, not for the whole app. */
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleShowConfirmation() {
  setShowConfirmation(true);
}

  return (
    <article
      className="color-card"
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      <p className="hex-text">{color.hex}</p>
      <p className="role-text">{color.role}</p>
      <p className="contrast-text">contrast: {color.contrastText}</p>


{showConfirmation === true ? (
  <>
  <p>Are you sure?</p> 
  <button
        onClick={() => onDeleteColor({ id: color.id })}
        className="confirm-button"
      >
        Confirm
      </button>
  <button onClick={() => setShowConfirmation(false)} className="cancel-button">Cancel</button>
   </>) : (
   <button
        onClick={handleShowConfirmation}
        className="delete-button"
      >
        Delete
      </button>)}

    </article>
  );
}
