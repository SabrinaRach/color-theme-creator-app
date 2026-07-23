import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

/* Each color card displays: siehe dafür colors.js
hex value of the color
the role of the color
the color itself in the background color of the element
the font in the respective contrastText color */

export default function Color({ color, onDeleteColor, onEditColor }) {
  /* The card that the user wants to delete shows a confirmation message.
   The state is located in Color because the confirmation is only needed
   for one card, not for the whole app. */
  const [showConfirmation, setShowConfirmation] = useState(false);
  /* Introduce a state for the edit, default value = false because color card is not in edit mode */
  const [showEdit, setShowEdit] = useState(false);

  function handleShowConfirmation() {
    setShowConfirmation(true);
  }

  function handleShowEdit() {
    setShowEdit(true);
  }

  function handleFinishEdit() {
    setShowEdit(false);
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
      
      <CopyToClipboard text={color.hex} />

      {showEdit ? (
        <ColorForm
          color={color}
          onEditColor={onEditColor}
          onFinishEdit={handleFinishEdit} /* closes the edit mode */
        />
      ) : (
        <>
          {showConfirmation === true ? (
            <>
              <p className="confirmation-message">Are you sure?</p>
              <button
                onClick={() => onDeleteColor({ id: color.id })}
                className="confirm-button"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
            <div className="delete-edit-button-container"> 
              <button
                onClick={handleShowConfirmation}
                className="delete-button"
              >
                Delete
              </button>
              <button onClick={handleShowEdit} className="edit-button">
                Edit
              </button></div>
             
            </>
          )}
        </>
      )}
    </article>
  );
}
